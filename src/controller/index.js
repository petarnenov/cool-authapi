import login from "./login.js";
import signUp from "./signUp.js";
import logout from "./logout.js";
import updateUserById from "./updateUserById.js";
import deleteUserById from "./deleteUserById.js";
import refreshToken from "./refreshToken.js";
import getAllUsers from "./getAllUsers.js";

const controller={
    login,
    signUp,
    logout,
    refreshToken,
    updateUserById,
    deleteUserById,
    getAllUsers
}

export default controller;
