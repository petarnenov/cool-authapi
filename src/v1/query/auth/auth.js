import utils from "../utils/index.js";
import queryStrings from "./queryStrings.js";

export const createUser = async ({ username, password }) => {
  return await utils.executeQuery(queryStrings.createUser, [
    username,
    password,
  ]);
};

export const getUserByName = async (username) => {
  return await utils.executeQuery(queryStrings.getUserByName, [username]);
};

export const getUserById = async (id) => {
  return await utils.executeQuery(queryStrings.getUserById, [id]);
};
