import bcrypt from "bcrypt";
import redis from "../../../redis/index.js";
import query from "../../../query/index.js";
import jwt from "../../../jwt/index.js";
import response from "../../../response/index.js";

const login = async (req, res, next) => {
  const { username, password } = req.body;

  const { rows, error } = await query.auth
    .getUserByName(username)
    .catch((err) => {
      return {
        error: response.error.users(null, response.COMMON.UNAUTHORIZED),
      };
    });

  if (error) {
    return next(error);
  }

  if (!rows.length) {
    next(response.error.users(null, response.COMMON.NOT_FOUND));
  }

  const user = rows[0];
  if (!user.active) {
    return next(response.error.users(null, response.USERS.HAS_BEEN_DELETED));
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(response.error.users(null, response.COMMON.UNAUTHORIZED));
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

  const statusAccessToken = await redis.query
    .setAccessToken(user.id)(accessToken)
    .catch((err) => [null, err]);

  if (statusAccessToken[1]) {
    return next(
      response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR)
    );
  }

  const statusRefreshToken = await redis.query
    .setRefreshToken(user.id)(refreshToken)
    .catch((err) => [null, err]);

  if (statusRefreshToken[1]) {
    return next(
      response.error.auth(null, response.COMMON.INTERNAL_SERVER_ERROR)
    );
  }

  req.user = {
    accessToken,
    refreshToken,
    username,
    id: user.id,
    admin: user.admin,
    roles: user.roles,
  };

  next();
};

export default login;
