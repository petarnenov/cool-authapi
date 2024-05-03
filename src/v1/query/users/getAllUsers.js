import utils from "../utils/index.js";
import queryStrings from "./queryStrings.js";

const getAllUsers = async () => {
  return await utils.executeQuery(queryStrings.getAllUsers, []);
};

export default getAllUsers;
