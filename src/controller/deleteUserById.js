import query from "../query/index.js";
import response from "../response/index.js";

const deleteUserById = async (req, res) => {
  const { id } = req.params;

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

  await query.auth.deleteUserById(id);

  const payload = {
    username: user.username,
    id: user.id,
    admin: user.admin,
  };

  response.success.deleteUser(payload)(res);
};

export default deleteUserById;
