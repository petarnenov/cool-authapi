import {createClient} from "redis";
import RedisStore from "connect-redis";

const redisClient = createClient({
  url: process.env.NODE_ENV === "production" ? process.env.REDIS_URL : "redis://localhost:6379/0",
});
redisClient.connect().catch(console.error);
redisClient.on("connect", () => console.log("Connected to Redis"));

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sid:",
})

export {redisStore};
export default redisClient;
