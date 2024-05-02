import bcrypt from "bcrypt";
import redis from "../../redis/index.js";
import query from "../../query/index.js";
import utils from "../../utils/index.js";
import jwt from "../../jwt/index.js";

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const { rows, error } = await query.auth
    .getUserByName(username)
    .catch((err) => {
      return {
        error: utils.customError(err.message, 500),
      };
    });

  if (error) {
    return next(error);
  }

  if (!rows.length) {
    next(utils.customError("User not found", 404));
  }

  const user = rows[0];
  if (!user.active) {
    return next(utils.customError("User has been deleted or deactivated", 401));
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(utils.customError("Username or password is incorrect", 401));
  }

  const accessToken = jwt.createAccessToken({
    username,
    id: user.id,
    admin: user.admin,
  });
  const refreshToken = jwt.createRefreshToken({
    username,
    id: user.id,
    admin: user.admin,
  });

  //TODO: add error handling
  await redis.query.setAccessToken(user.id)(accessToken);
  await redis.query.setRefreshToken(user.id)(refreshToken);

  req.user = {
    accessToken,
    refreshToken,
    username,
    id: user.id,
    admin: user.admin,
  };

  next();
};

export default login;
