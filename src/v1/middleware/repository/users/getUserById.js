import query from "../../../query/index.js";
import response from "../../../response/index.js";

const getUserById = async (req, res, next) => {
  const id = req.user.id;

  const { rows, error } = await query.users.getUserById(id).catch((err) => {
    return {
      error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
    };
  });

  if (error) {
    return next(error);
  }

  if (!rows.length) {
    next(response.error.users(null, response.COMMON.NOT_FOUND));
  }

  req.user = rows[0];

  next();
};

export default getUserById;
