import query from "../query/index.js";
import response from "../response/index.js";

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!id) {
    return response.error.invalidRequest(res);
  }

  const currentUser = req.user;

  if (!currentUser) {
    return response.error.invalidToken(res);
  }

  const { admin, id: userId } = currentUser;

  if (!(admin || userId === id)) {
    return response.error.userNotAuthenticated(res);
  }

  const userQuery = await query.auth.getUserById(id).catch((err) => {
    return response.error.internalServerError(res);
  });

  if (!userQuery.rows.length) {
    return response.error.userNotFound(res);
  }

  const user = userQuery.rows[0];

  if (!user.active) {
    return response.error.userDeletedOrDeactivated(res);
  }

  const updateUserQuery = await query.auth.updateUserById({
    ...updatedData,
    id,
  }).catch((err) => {
    return response.error.internalServerError(res);
  });

  const updatedUser = updateUserQuery.rows[0];

  const payload = {
    username: updatedUser.username,
    id: updatedUser.id,
    admin: updatedUser.admin,
  };

  response.success.auth.updateUser(payload)(res);
};

export default updateUserById;
