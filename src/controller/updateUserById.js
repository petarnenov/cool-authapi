import query from "../query/index.js";
import response from "../response/index.js";

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!id) {
    return response.error.invalidRequest(res);
  }

  const decodedToken = req.decodedToken;

  if (!decodedToken) {
    return response.error.invalidToken(res);
  }

  const { admin, id: userId } = decodedToken;

  if (!(admin || userId === id)) {
    return response.error.unauthorizedAction(res);
  }

  const foundUsers = await query.auth.getUserById(id);

  if (!foundUsers.rows.length) {
    return response.error.userNotFound(res);
  }

  const user = foundUsers.rows[0];

  if (!user.active) {
    return response.error.userDeletedOrDeactivated(res);
  }

  const updatedUser = await query.auth.updateUserById({
    ...updatedData,
    id,
  });

  const payload = {
    username: updatedUser.username,
    id: updatedUser.id,
    admin: updatedUser.admin,
  };

  response.success.updateUser(payload)(res);
};

export default updateUserById;
