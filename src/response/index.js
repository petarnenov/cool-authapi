import error from "./error/index.js";
import success from "./success/index.js";
import constants from "./constants.js";

const response = {
  error,
  success,
  ...constants,
};

export default response;
