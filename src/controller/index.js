import login from "./login.js";
import signup from "./signup.js";
import logout from "./logout.js";
import updateUserById from "./updateUserById.js";
import deleteUserById from "./deleteUserById.js";
import refresh from "./refresh.js";
import getAllUsers from "./getAllUsers.js";
import greet from "./greet.js";
import getUserById from "./getUserById.js";

const controller = {
  greet,
  login,
  signup,
  logout,
  refreshToken: refresh,
  updateUserById,
  deleteUserById,
  getAllUsers,
  getUserById,
};

export default controller;
