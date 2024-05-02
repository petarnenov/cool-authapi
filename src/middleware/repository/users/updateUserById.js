import bcrypt from "bcrypt";
import utils from "../../../utils/index.js";
import query from "../../../query/index.js";

const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const currentUser = req.user;

  if (!currentUser) {
    return next(
      utils.customError("You are not authorized to perform this action", 403),
    );
  }

  const { admin, id: userId } = currentUser;

  if (!(admin || userId === id)) {
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
    return next(utils.customError("User is not active", 400));
  }

  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  const { rows: rowsUpdateUserById, error: errorUpdateUserById } =
    await query.users
      .updateUserById({
        id,
        ...updatedData,
      })
      .catch((err) => {
        return {
          error: {
            message: err.message,
            stack: err.stack,
          },
        };
      });

  if (errorUpdateUserById) {
    return next(utils.customError("Internal Server Error", 500));
  }

  req.user = rowsUpdateUserById[0];

  next();
};

export default updateUserById;
