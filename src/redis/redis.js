import {createClient} from "redis";
import RedisStore from "connect-redis";

const redisClient = createClient();
redisClient.connect().catch(console.error);
redisClient.on("connect", () => console.log("Connected to Redis"));

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sid:",
})

export {redisStore};
export default redisClient;
