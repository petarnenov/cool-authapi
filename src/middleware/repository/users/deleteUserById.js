import query from "../../../query/index.js";
import utils from "../../../utils/index.js";

const deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = req.user;

  if (!currentUser) {
    return next(
      utils.customError("You are not authorized to perform this action", 403),
    );
  }

  const { admin, id: userId } = currentUser;

  if (!(admin || id === userId)) {
    return next(
      utils.customError("You are not authorized to perform this action", 403),
    );
  }

  const { rows, error } = await query.users.getUserById(id).catch((err) => {
    return {
      error: {
        message: err.message,
        stack: err.stack,
      },
    };
  });

  if (error) {
    return next(utils.customError("Internal Server Error", 500));
  }

  if (!rows.length) {
    return next(utils.customError("User not found", 404));
  }

  const user = rows[0];

  if (!user.active) {
    return next(utils.customError("User is already deleted", 400));
  }

  const { error: errorDelete } = await query.users
    .deleteUserById(user.id)
    .catch((err) => {
      return {
        error: {
          message: err.message,
          stack: err.stack,
        },
      };
    });

  if (errorDelete) {
    return next(utils.customError("Internal Server Error", 500));
  }

  req.user = user;
  next();
};

export default deleteUserById;
