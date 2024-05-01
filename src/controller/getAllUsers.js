import query from "../query/index.js";
import response from "../response/index.js";

const getAllUsers = async (req, res) => { 

  const currentUser = req.user;

  const { admin } = currentUser;

  if (!admin) {
    return response.error.userNotAuthenticated(res);
  }

  const allUsersQuery = await query.auth.getAllUsers().catch((err) => {
    return response.error.internalServerError(res);
  });

  const users = allUsersQuery.rows;

  const payload = {
    users,
  };

  response.success.auth.getAllUsers(payload)(res);
};

export default getAllUsers;
