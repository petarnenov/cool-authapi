import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  url:
    process.env.NODE_ENV === "production"
      ? process.env.REDIS_URL
      : "redis://localhost:6379/0",
});

redisClient
  .on("ready", () => {
    console.log("Redis is ready");
  })
  .on("error", console.error)
  .connect();

export default redisClient;
