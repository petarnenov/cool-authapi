import utils from "./utils/index.js";
import auth from "./auth/index.js";
import validator from "./validator/index.js";
import logger from "./logger/index.js";
import repository from "./repository/index.js";
import cache from "./cache/index.js";

const middleware = {
  utils,
  auth,
  validator,
  logger,
  repository,
  cache,
};

export default middleware;
