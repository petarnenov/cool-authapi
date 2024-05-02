import constants from "../constants.js";

const defaultPayload = {
  accessToken: null,
  refreshToken: null,
};

const users = (payload = {}, type) =>
  ({
    [constants.USERS.GET_USERS]: {
      status: 200,
      statusMessage: "Retrieve users successful",
      ...defaultPayload,
      ...payload,
    },
    [constants.USERS.GET_USER]: {
      status: 200,
      statusMessage: "User retrieve successfully",
      ...defaultPayload,
      ...payload,
    },
    [constants.USERS.UPDATE_USER]: {
      status: 200,
      statusMessage: "User updated successfully",
      ...defaultPayload,
      ...payload,
    },
    [constants.USERS.DELETE_USER]: {
      status: 200,
      statusMessage: "User delete successfully",
      ...defaultPayload,
      ...payload,
    },
  }[type]);

export default users;
