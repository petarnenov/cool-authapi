import constants from "../../constants.js";

const users = (payload = {}, type) =>
  ({
    [constants.JWT.INVALID_TOKEN]: {
      status: 400,
      statusMessage: "Invalid token",
      ...payload,
    },
    [constants.USERS.USER_ALREADY_EXISTS]: {
      status: 400,
      statusMessage: "User already exists",
      ...payload,
    },
    [constants.USERS.USER_OR_PASSWORD_INCORRECT]: {
      status: 403,
      statusMessage: "User or password is incorrect",
      ...payload,
    },
  })[type];

export default users;
