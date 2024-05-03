import jwt from "../../jwt/index.js";
import response from "../../response/index.js";
import redis from "../../redis/index.js";

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

  req.user = { ...user };
  next();
};

export default authentication;
