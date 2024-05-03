import utils from "../utils/index.js";
import queryStrings from "./queryStrings.js";

const updateUserById = async ({ id, admin, active, password, roles }) => {
  return await utils.executeQuery(queryStrings.updateUserById, [
    id,
    admin,
    password,
    active,
    roles,
  ]);
};

export default updateUserById;
