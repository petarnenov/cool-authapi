import constants from "../constants.js";

const defaultPayload = {
  accessToken: null,
  refreshToken: null,
};

const auth = (payload = {}, type) =>
  ({
    [constants.AUTH.LOGIN]: {
      status: 200,
      statusMessage: "Login successful",
      ...defaultPayload,
      ...payload,
    },
    [constants.AUTH.SIGNUP]: {
      status: 201,
      statusMessage: "User created successfully",
      ...defaultPayload,
      ...payload,
    },
    [constants.AUTH.LOGOUT]: {
      status: 200,
      statusMessage: "User logout successfully",
      ...defaultPayload,
      ...payload,
    },
    [constants.AUTH.REFRESH]: {
      status: 200,
      statusMessage: "Token refreshed successfully",
      ...defaultPayload,
      ...payload,
    },
  }[type]);

export default auth;
