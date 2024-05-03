import jwt from "../../../jwt/index.js";
import redis from "../../../redis/index.js";
import response from "../../../response/index.js";

const logout = async (req, res, next) => {
  const user = req.user;
  const accessToken = jwt.getAccessToken(req);
  const refreshToken = jwt.getRefreshToken(req);
  const decodedRefreshToken = jwt.getDecodedRefreshToken(req);

  console.log("delete user: ", user);

  if (!decodedRefreshToken) {
    const { error } = await redis.query
      .deleteAccessToken(user.id)(accessToken)
      .catch((err) => {
        return {
          error: response.error.auth(
            null,
            response.COMMON.INTERNAL_SERVER_ERROR,
          ),
        };
      });

    if (error) {
      return next(error);
    }

    return next(response.error.auth(null, response.USERS.INVALID_TOKEN));
  }

  const { error: errorDeleteAccessToken } = await redis.query
    .deleteAccessToken(user.id)(accessToken)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (errorDeleteAccessToken) {
    return next(errorDeleteAccessToken);
  }

  const { error: errorDeleteRefreshToken } = await redis.query
    .deleteRefreshToken(user.id)(refreshToken)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (errorDeleteRefreshToken) {
    return next(errorDeleteRefreshToken);
  }

  next();
};

export default logout;
