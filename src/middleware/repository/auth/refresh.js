import jwt from "../../../jwt/index.js";
import redis from "../../../redis/index.js";
import utils from "../../../utils/index.js";

const refresh = async (req, res, next) => {
  const decodedRefreshToken = await jwt.getDecodedRefreshToken(req);

  if (!decodedRefreshToken) {
    return next(utils.customError(401, "Unauthorized"));
  }

  const refreshToken = jwt.getRefreshToken(req);

  const tokenExists = await redis.query.getRefreshToken(decodedRefreshToken.id)(
    refreshToken,
  );

  if (!tokenExists) {
    return next(utils.customError(401, "Unauthorized"));
  }

  await redis.query.deleteRefreshToken(decodedRefreshToken.id)(refreshToken);

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

  await redis.query.setAccessToken(decodedRefreshToken.id)(newAccessToken);
  await redis.query.setRefreshToken(decodedRefreshToken.id)(newRefreshToken);

  req.user = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    username: decodedRefreshToken.username,
    id: decodedRefreshToken.id,
    admin: decodedRefreshToken.admin,
  };

  next();
};

export default refresh;
