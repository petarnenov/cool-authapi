import query from "../../../query/index.js";
import utils from "../../../utils/index.js";

const getUserById = async (req, res, next) => {
  const id = req.user.id;

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
    next(utils.customError("User not found", 404));
  }

  req.user = rows[0];

  next();
};

export default getUserById;
