import query from "../../../query/index.js";
import response from "../../../response/index.js";

const getAllUsers = async (req, res, next) => {
  const currentUser = req.user;

  const { admin } = currentUser;

  if (!admin) {
    return next(response.error.auth(null, response.COMMON.FORBIDDEN));
  }

  const { rows, error } = await query.users.getAllUsers().catch((err) => {
    return {
      error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
    };
  });

  if (error) {
    return next(error);
  }

  req.users = { users: [...rows] };

  next();
};

export default getAllUsers;
