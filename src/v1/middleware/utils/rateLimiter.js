import redis from "../../redis/index.js";
import response from "../../response/index.js";

const rateLimiter =
  (ratePerMin = process.env.REDIS_REQ_PER_MINUTE || 60) =>
  async (req, res, next) => {
    const ip = req.connection.remoteAddress;
    const attempts = await redis.query
      .incrAttempts(ip)
      .catch((err) => [null, err]);

    if (attempts[0] === null) {
      return next(
        response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      );
    }

    if (attempts[0] > ratePerMin) {
      return next(response.error.auth(null, response.AUTH.TOO_MANY_REQUESTS));
    }
    next();
  };

export default rateLimiter;
