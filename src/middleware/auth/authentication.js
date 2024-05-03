import jwt from "../../jwt/index.js";
import response from "../../response/index.js";
import redis from "../../redis/index.js";

const authentication = async (req, res, next) => {
  const user = await jwt.getDecodedAccessToken(req);
  if (!user) {
    return response.error.userNotAuthenticated(res);
  }
  const clientAccessToken = jwt.getAccessToken(req);
  const serverAccessToken = await redis.query.getAccessToken(user.id)(
    clientAccessToken,
  );

  if (!serverAccessToken) {
    return response.error.userNotAuthenticated(res);
  }

  req.user = { ...user };
  next();
};

export default authentication;
