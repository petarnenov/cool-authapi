import pool from "../../pg/index.js";
import queryStrings from "./queryStrings.js";

const executeQuery = async (queryString, values) => {
  if (!values || !Array.isArray(values)) {
    console.error("invalid values or values are not array", values);
    return Promise.reject(new Error("invalid values or values are not array"));
  }

  return await pool.query(queryString, values);
};

const deleteUserById = async (id) => {
  return await executeQuery(queryStrings.deleteUserById, [id]);
};

export default deleteUserById;
