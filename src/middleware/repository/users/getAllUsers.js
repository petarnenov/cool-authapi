import query from "../../../query/index.js";
import utils from "../../../utils/index.js";

const getAllUsers = async (req, res, next) => {
  const currentUser = req.user;

  const { admin } = currentUser;

  if (!admin) {
    return next(
      utils.customError("You are not authorized to perform this action", 403),
    );
  }

  const { rows, error } = await query.users.getAllUsers().catch((err) => {
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

  req.users = { users: [...rows] };

  next();
};

export default getAllUsers;
