import constants from "../constants.js";

const auth = (payload = {}, type) =>
  ({
    [constants.AUTH.LOGIN]: {
      status: 200,
      statusMessage: "Login successful",
      ...payload,
    },
    [constants.AUTH.SIGNUP]: {
      status: 201,
      statusMessage: "User created successfully",
      ...payload,
    },
    [constants.AUTH.LOGOUT]: {
      status: 200,
      statusMessage: "User logout successfully",
      ...payload,
    },
    [constants.AUTH.REFRESH]: {
      status: 200,
      statusMessage: "Token refreshed successfully",
      ...payload,
    },
  })[type];

export default auth;
