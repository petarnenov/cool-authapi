import bcrypt from "bcrypt";
import query from "../../../query/index.js";
import response from "../../../response/index.js";
import utils from "../../../utils/index.js";

const signup = async (req, res, next) => {
  const { username, password } = req.body;

  const { rows: rowsFindByName, error: errorFindByName } = await query.auth
    .getUserByName(username)
    .catch((err) => {
      return {
        error: utils.customError(err.message, 500),
      };
    });

  if (errorFindByName) {
    return next(error);
  }

  if (rowsFindByName.length) {
    return next(utils.customError("User exists", 400));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const { rows, error } = await query.auth
    .createUser({
      username,
      password: hashPassword,
    })
    .catch((error) => {
      return { error: utils.customError(error.message, 500) };
    });

  if (error) {
    return next(error);
  }

  const newUser = rows[0];
  req.user = { ...newUser };

  next();
};

export default signup;
