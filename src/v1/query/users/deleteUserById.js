import utils from "../utils/index.js";
import queryStrings from "./queryStrings.js";

const deleteUserById = async (id) => {
  return await utils.executeQuery(queryStrings.deleteUserById, [id]);
};

export default deleteUserById;
