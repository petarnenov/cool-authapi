import utils from "../utils/index.js";
import redis from "../redis/index.js";
import response from "../response/index.js";
import dotenv from "dotenv";

dotenv.config();

const rateLimiter =
  (ratePerMin = process.env.REDIS_REQ_PER_MINUTE || 60) =>
  async (req, res, next) => {
    const ip = req.connection.remoteAddress;
    const attempts = await redis.query
      .incrAttempts(ip)
      .catch((err) => [null, err]);

    if (attempts[0] === null) {
      return next(utils.customError(attempts[1], 500));
    }

    if (attempts[0] > ratePerMin) {
      return next(utils.customError("Rate limit exceeded", 429));
    }
    next();
  };

export default rateLimiter;
