import pool from "../../pg/index.js";
import queryStrings from "./queryStrings.js";

const executeQuery = async (queryString, values) => {
  if (!values || !Array.isArray(values)) {
    console.error("invalid values or values are not array", values);
    return Promise.reject(new Error("invalid values or values are not array"));
  }

  return await pool.query(queryString, values);
};

export const createUser = async ({ username, password }) => {
  return await executeQuery(queryStrings.createUser, [username, password]);
};

export const getUserByName = async (username) => {
  return await executeQuery(queryStrings.getUserByName, [username]);
};

export const getUserById = async (id) => {
  return await executeQuery(queryStrings.getUserById, [id]);
};
