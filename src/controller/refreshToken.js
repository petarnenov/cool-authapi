import response from "../response/index.js";
import jwt from "../jwt/index.js";
import redis from "../redis/index.js";

const refreshToken = async (req, res) => {
  const decodedRefreshToken = await jwt.getDecodedRefreshToken(req);

  if (!decodedRefreshToken) {
    return response.error.userNotAuthenticated(res);
  }

  const { refreshToken } = req.body;  
  const tokenStack = await redis.client
    .multi()
    .lRange(decodedRefreshToken.id, 0, -1)
    .exec();
  if (!tokenStack[0].includes(refreshToken)) {
    await redis.client.multi().del(decodedRefreshToken.id).exec();
    return response.error.userNotAuthenticated(res);
  }

  //TODO: export all redis commands to a separate file
  await redis.client.multi().lRem(decodedRefreshToken.id, 0, refreshToken).exec();

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

  await redis.client.multi().lPush(decodedRefreshToken.id, newRefreshToken).exec();

  const payload = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    username: decodedRefreshToken.username,
    id: decodedRefreshToken.id,
    admin: decodedRefreshToken.admin,
  };

  response.success.refresh(payload)(res);
};

export default refreshToken;
