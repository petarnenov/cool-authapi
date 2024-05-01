import response from "../response/index.js";
import jwt from "../jwt/index.js";
import redis from "../redis/index.js";

const refreshToken = async (req, res) => {
  const decodedRefreshToken = await jwt.getDecodedRefreshToken(req);

  console.log("decodedRefreshToken", decodedRefreshToken);

  if (!decodedRefreshToken) {
    return response.error.userNotAuthenticated(res);
  }

  const refreshToken = jwt.getRefreshToken(req); 

  const tokenExists = await redis.query.getRefreshToken(decodedRefreshToken.id)(refreshToken);

  if(!tokenExists){
    return response.error.userNotAuthenticated(res);
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

  const payload = {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    username: decodedRefreshToken.username,
    id: decodedRefreshToken.id,
    admin: decodedRefreshToken.admin,
  };

  response.success.auth.refresh(payload)(res);
};

export default refreshToken;
