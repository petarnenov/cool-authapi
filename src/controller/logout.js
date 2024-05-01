import response from "../response/index.js";
import jwt from "../jwt/index.js";
import redis from "../redis/index.js";

export const logout = async (req, res) => {
  const user = req.user;  
  const accessToken = jwt.getAccessToken(req);
  const refreshToken = jwt.getRefreshToken(req);
  const decodedRefreshToken = jwt.getDecodedRefreshToken(req);

  if(!decodedRefreshToken){
    await redis.query.deleteAccessToken(user.id)(accessToken);
    return response.error.userNotAuthenticated(res);
  }  

  await redis.query.deleteAccessToken(user.id)(accessToken);
  await redis.query.deleteRefreshToken(user.id)(refreshToken);

  response.success.auth.logout(res);
};

export default logout;
