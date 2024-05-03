import bcrypt from "bcrypt";
import query from "../../../query/index.js";
import response from "../../../response/index.js";

const signup = async (req, res, next) => {
  const { username, password } = req.body;

  const { rows: rowsFindByName, error: errorFindByName } = await query.auth
    .getUserByName(username)
    .catch((err) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (errorFindByName) {
    return next(errorFindByName);
  }

  if (rowsFindByName.length) {
    return next(response.error.users(null, response.USERS.ALREADY_EXISTS));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const { rows, error } = await query.auth
    .createUser({
      username,
      password: hashPassword,
    })
    .catch((error) => {
      return {
        error: response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR),
      };
    });

  if (error) {
    return next(error);
  }

  const newUser = rows[0];
  req.user = { ...newUser };

  next();
};

export default signup;
