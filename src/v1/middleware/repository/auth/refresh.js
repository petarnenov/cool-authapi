import jwt from "../../../jwt/index.js";
import redis from "../../../redis/index.js";
import response from "../../../response/index.js";

const refresh = async (req, res, next) => {
  const decodedRefreshToken = await jwt.getDecodedRefreshToken(req);

  if (!decodedRefreshToken) {
    return next(response.error.users(null, response.USERS.INVALID_TOKEN));
  }

  const refreshToken = jwt.getRefreshToken(req);

  const tokenExists = await redis.query
    .getRefreshToken(decodedRefreshToken.id)(refreshToken)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (tokenExists?.error) {
    return next(tokenExists.error);
  }

  if (!tokenExists) {
    return next(response.error.auth(null, response.USERS.INVALID_TOKEN));
  }

  const { error: deleteRefreshToken } = await redis.query
    .deleteRefreshToken(decodedRefreshToken.id)(refreshToken)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (deleteRefreshToken) {
    return next(deleteRefreshToken);
  }

  const newAccessToken = jwt.createAccessToken({
    username: decodedRefreshToken.username,
    id: decodedRefreshToken.id,
    admin: decodedRefreshToken.admin,
  });
  const newRefreshToken = jwt.createRefreshToken({
    username: decodedRefreshToken.username,
    id: decodedRefreshToken.id,
    admin: decodedRefreshToken.admin,
  });

  const { error: errorSetAccessToken } = await redis.query
    .setAccessToken(decodedRefreshToken.id)(newAccessToken)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (errorSetAccessToken) {
    return next(errorSetAccessToken);
  }

  const { error: errorSetRefreshToken } = await redis.query
    .setRefreshToken(decodedRefreshToken.id)(newRefreshToken)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (errorSetRefreshToken) {
    return next(errorSetRefreshToken);
  }

  req.user = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    username: decodedRefreshToken.username,
    id: decodedRefreshToken.id,
    admin: decodedRefreshToken.admin,
    roles: decodedRefreshToken.roles,
  };

  next();
};

export default refresh;
