import pool from "../../pg/index.js";
import queryStrings from "./queryStrings.js";

//TODO: extract this to a common file
const executeQuery = async (queryString, values) => {
  if (!values || !Array.isArray(values)) {
    console.error("invalid values or values are not array", values);
    return Promise.reject(new Error("invalid values or values are not array"));
  }

  return await pool.query(queryString, values);
};

const getAllUsers = async () => {
  return await executeQuery(queryStrings.getAllUsers, []);
};

export default getAllUsers;
