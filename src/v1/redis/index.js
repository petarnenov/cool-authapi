import client from "./redis.js";
import * as query from "./query/index.js";

const redis = {
  client,
  query,
};

export default redis;
