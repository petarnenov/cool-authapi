import pool from "../../pg/index.js";

const queryStrings = {
  createUser:
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username, id, admin",
  getUserByName: "SELECT * FROM users WHERE username = $1",
  getUserById: "SELECT * FROM users WHERE id = $1",
  deleteUserById:
    "UPDATE users SET active = $2, updated_at = DEFAULT WHERE id = $1",
  updateUserById:
    "UPDATE users SET admin = $2, updated_at = DEFAULT WHERE id = $1 RETURNING *",
  getAllUsers:
    "SELECT id, username, created_at, updated_at, active, admin,roles FROM users",
};

const executeQuery = async (queryString, values) => {
  if (!values || !Array.isArray(values)) {
    console.error("invalid values or values are not array", values);
    throw new Error("invalid values or values are not array");
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

export const deleteUserById = async (id) => {
  return await executeQuery(queryStrings.deleteUserById, [id, false]);
};

export const updateUserById = async ({ id, admin }) => {
  return await executeQuery(queryStrings.updateUserById, [id, admin]);
};

export const getAllUsers = async () => {
  return await executeQuery(queryStrings.getAllUsers, []);
};
