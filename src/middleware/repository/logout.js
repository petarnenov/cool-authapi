import jwt from "../../jwt/index.js";
import redis from "../../redis/index.js";
import utils from "../../utils/index.js";

const logout = async (req, res, next) => {
  const user = req.user;
  const accessToken = jwt.getAccessToken(req);
  const refreshToken = jwt.getRefreshToken(req);
  const decodedRefreshToken = jwt.getDecodedRefreshToken(req);

  if (!decodedRefreshToken) {
    await redis.query.deleteAccessToken(user.id)(accessToken);
    return next(utils.customError(401, "Unauthorized"));
  }

  await redis.query.deleteAccessToken(user.id)(accessToken);
  await redis.query.deleteRefreshToken(user.id)(refreshToken);

  next();
};

export default logout;

