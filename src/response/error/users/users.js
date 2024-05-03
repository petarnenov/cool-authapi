import constants from "../../constants.js";

const users = (payload = {}, type) =>
  ({
    [constants.USERS.INVALID_TOKEN]: {
      status: 400,
      statusMessage: "Invalid token",
      ...payload,
    },
    [constants.USERS.ALREADY_EXISTS]: {
      status: 400,
      statusMessage: "User already exists",
      ...payload,
    },
    [constants.USERS.INCORRECT_CREDENTIALS]: {
      status: 403,
      statusMessage: "User or password is incorrect",
      ...payload,
    },
  }[type]);

export default users;
