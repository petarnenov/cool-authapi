import query from "../../../query/index.js";
import response from "../../../response/index.js";

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = req.user;

  if (!currentUser) {
    return next(
      response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR)
    );
  }

  const { admin, id: userId } = currentUser;

  if (!(admin || id === userId)) {
    return next(response.error.auth(null, response.COMMON.FORBIDDEN));
  }

  const { rows, error } = await query.users.getUserById(id).catch((err) => {
    return {
      error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
    };
  });

  if (error) {
    return next(error);
  }

  if (!rows.length) {
    return next(response.error.users(null, response.COMMON.NOT_FOUND));
  }

  const user = rows[0];

  if (!user.active) {
    return next(response.error.users(null, response.USERS.HAS_BEEN_DELETED));
  }

  const { error: errorDelete } = await query.users
    .deleteUserById(user.id)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (errorDelete) {
    return next(errorDelete);
  }

  req.user = user;
  next();
};

export default deleteUserById;
