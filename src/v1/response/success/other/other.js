import constants from "../../constants.js";

const other = (payload = {}, type) =>
  ({
    [constants.GREET.HELLO]: {
      status: 200,
      statusMessage: "Hello World",
      ...payload,
    },
  })[type];

export default other;
