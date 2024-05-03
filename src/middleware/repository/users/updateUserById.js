import bcrypt from "bcrypt";
import query from "../../../query/index.js";
import response from "../../../response/index.js";

const updateUserById = async (req, res, next) => {
  const { id: idToUpdate } = req.params;
  const updatedData = req.body;

  const currentUser = req.user;

  if (!currentUser) {
    return next(response.error.auth(null, response.COMMON.FORBIDDEN));
  }

  const { admin, id: userId } = currentUser;

  if (!(admin || userId === idToUpdate)) {
    return next(response.error.auth(null, response.COMMON.FORBIDDEN));
  }

  const { rows, error } = await query.users
    .getUserById(idToUpdate)
    .catch((err) => {
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

  if (!admin && updatedData.admin) {
    return next(response.error.auth(null, response.COMMON.FORBIDDEN));
  }

  if(!admin && updatedData.roles?.length){
    return next(response.error.auth(null, response.COMMON.FORBIDDEN));
  }

  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  const { rows: rowsUpdateUserById, error: errorUpdateUserById } =
    await query.users
      .updateUserById({
        id: idToUpdate,
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
