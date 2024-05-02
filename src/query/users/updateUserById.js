import utils from "../utils/index.js";
import queryStrings from "./queryStrings.js";

const updateUserById = async ({ id, admin, active, password }) => {
  return await utils.executeQuery(queryStrings.updateUserById, [
    id,
    admin,
    password,
    active,
  ]);
};

export default updateUserById;
