import response from "../response/index.js";
import jwt from "../jwt/index.js";
import redis from "../redis/index.js";

export const logout = async (req, res) => {
  const decodedRefreshToken = await jwt.getDecodedRefreshToken(req);
  if (!decodedRefreshToken) {
    return response.error.userNotAuthenticated(res);
  }

  const { refreshToken } = req.body;
  await redis.client.multi().lRem(decodedRefreshToken.id, 0, refreshToken).exec();

  response.success.logout(res);
};

export default logout;
