import constants from "../constants.js";

const defaultPayload = {
  accessToken: null,
  refreshToken: null,
};

const other = (payload = {}, type) =>
  ({
    [constants.GREET.HELLO]: {
      status: 200,
      statusMessage: "Hello World",
      ...defaultPayload,
      ...payload,
    },    
  }[type]);

export default other;
