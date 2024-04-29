import redis from "../redis/index.js";
import response from "../response/index.js";
import dotenv from "dotenv";

dotenv.config();

const rateLimiter =  (ratePerMin=process.env.REDIS_REQ_PER_MINUTE || 60)=>async (req, res, next) => {
  const ip = req.connection.remoteAddress;
  const attempts = await redis.client.multi().incr(ip).expire(ip, 60).exec();
 
  if (attempts[0]>ratePerMin) {
      return response.error.tooManyRequests(res);
  }
  next();
};

export default rateLimiter;
