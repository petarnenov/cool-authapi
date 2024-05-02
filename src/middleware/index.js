import rateLimiter from "./rateLimiter.js";
import authentication from "./authentication.js";
import authorization from "./authorization.js";
import errorHandler from "./errorHandler.js";
import validator from "./validator/index.js";
import logger from "./logger/index.js";
import repository from "./repository/index.js";

const middleware = {
  rateLimiter,
  authentication,
  authorization,
  errorHandler,
  validator,
  logger,
  repository,
};

export default middleware;
