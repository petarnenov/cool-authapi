import constants from "../constants.js";

const users = (payload = {}, type) =>
  ({
    [constants.USERS.GET_USERS]: {
      status: 200,
      statusMessage: "Retrieve users successful",     
      ...payload,
    },
    [constants.USERS.GET_USER_BY_ID]: {
      status: 200,
      statusMessage: "User retrieve successfully",     
      ...payload,
    },
    [constants.USERS.UPDATE_USER]: {
      status: 200,
      statusMessage: "User updated successfully",    
      ...payload,
    },
    [constants.USERS.DELETE_USER]: {
      status: 200,
      statusMessage: "User delete successfully",     
      ...payload,
    },
  }[type]);

export default users;
