import constants from "../../constants.js";

const auth = (payload = {}, type) =>
  ({
    [constants.COMMON.BAD_REQUEST]: {
      status: 400,
      statusMessage: "Bad request",
      ...payload,
    },
    [constants.COMMON.UNAUTHORIZED]: {
      status: 401,
      statusMessage: "User is not authenticated",
      ...payload,
    },
    [constants.COMMON.FORBIDDEN]: {
      status: 403,
      statusMessage: "Forbidden",
      ...payload,
    },
    [constants.COMMON.NOT_FOUND]: {
      status: 404,
      statusMessage: "Entity not found",
      ...payload,
    },
    [constants.COMMON.TOO_MANY_REQUESTS]: {
      status: 429,
      statusMessage: "Too many requests",
      ...payload,
    },
    [constants.COMMON.INTERNAL_SERVER_ERROR]: {
      status: 500,
      statusMessage: "Internal server error",
      ...payload,
    },
    [constants.COMMON.SERVICE_UNAVAILABLE]: {
      status: 503,
      statusMessage: "Service unavailable",
      ...payload,
    },
  })[type];

export default auth;
