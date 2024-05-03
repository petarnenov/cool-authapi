import bcrypt from "bcrypt";
import query from "../../../query/index.js";
import response from "../../../response/index.js";

const updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const currentUser = req.user;

  if (!currentUser) {
    return next(response.error.auth(null, response.COMMON.FORBIDDEN));
  }

  const { admin, id: userId } = currentUser;

  if (!(admin || userId === id)) {
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
          error: response.error.auth(
            null,
            response.COMMON.INTERNAL_SERVER_ERROR
          ),
        };
      });

  if (errorUpdateUserById) {
    return next(errorUpdateUserById);
  }

  req.user = rowsUpdateUserById[0];

  next();
};

export default updateUserById;
