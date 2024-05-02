import utils from "../utils/index.js";
import queryStrings from "./queryStrings.js";

const getUserById = async (id) => {
  return await utils.executeQuery(queryStrings.getUserById, [id]);
};

export default getUserById;
