import jwt from "../../jwt/index.js";
import response from "../../response/index.js";
import redis from "../../redis/index.js";
import query from "../../query/index.js";

const authentication = async (req, res, next) => {
  const user = await jwt.getDecodedAccessToken(req);
  if (!user) {
    return next(response.error.auth(null, response.COMMON.UNAUTHORIZED));
  }
  const clientAccessToken = jwt.getAccessToken(req);
  const serverAccessToken = await redis.query
    .getAccessToken(user.id)(clientAccessToken)
    .catch((err) => {
      return [null, err];
    });

  if (serverAccessToken[0] === null) {
    return response.error.auth.auth(
      serverAccessToken[1],
      response.COMMON.UNAUTHORIZED,
    );
  }

  const { id: userId } = user;
  //get current user by id from db don't use req.user
  const { rows: rowsCurrentUser, error: errorCurrentUser } = await query.users
    .getUserById(userId)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (errorCurrentUser) {
    return next(errorCurrentUser);
  }

  if (!rowsCurrentUser.length) {
    return next(response.error.auth(null, response.COMMON.UNAUTHORIZED));
  }

  const currentUserData = rowsCurrentUser[0];

  req.user = {
    ...user,
    ...currentUserData,
  };

  next();
};

export default authentication;
