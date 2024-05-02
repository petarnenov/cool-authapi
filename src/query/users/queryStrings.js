const queryStrings = {
  updateUserById:
    "UPDATE users SET admin = COALESCE($2,admin), password = COALESCE($3, password), active = COALESCE($4,active), updated_at = DEFAULT WHERE id = $1 RETURNING id, username, active, admin, roles",
  getAllUsers:
    "SELECT id, username, created_at, updated_at, active, admin,roles FROM users",
  getUserById:
    "SELECT id, username, created_at, updated_at, active, admin,roles FROM users WHERE id = $1",
  deleteUserById:
    "UPDATE users SET active = false, updated_at = DEFAULT WHERE id = $1 RETURNING id, username, created_at",
};

export default queryStrings;
