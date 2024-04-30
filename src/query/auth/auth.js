import pool from "../../pg/index.js";

export const createUser = async ({ username, password }) => {
  return await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING username, id, admin",
    [username, password]
  );
};

export const getUserByName = async (username) => {
  return await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
};

export const getUserById = async (id) => {
  return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
};

export const deleteUserById = async (id) => {
  return await pool.query(
    "UPDATE users SET active = $2, updated_at = DEFAULT WHERE id = $1",
    [id, false]
  );
};

export const updateUserById = async ({ id, admin }) => {
  return await pool.query(
    "UPDATE users SET admin = $2, updated_at = DEFAULT WHERE id = $1 RETURNING *",
    [id, admin]
  );
};

export const getAllUsers = async () => {
  return await pool.query(
    "SELECT id, username, created_at, updated_at, active, admin,roles FROM users"
  );
};
