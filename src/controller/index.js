import login from "./login.js";
import signUp from "./signUp.js";
import logout from "./logout.js";
import updateUserById from "./updateUserById.js";
import deleteUserById from "./deleteUserById.js";
import refreshToken from "./refreshToken.js";

const controller={
    login,
    signUp,
    logout,
    refreshToken,
    updateUserById,
    deleteUserById
}

export default controller;
