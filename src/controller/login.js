import bcrypt from "bcrypt";
import query from "../query/index.js";
import response from "../response/index.js";
import jwt from "../jwt/index.js";
import redis from "../redis/index.js";

const login = async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return response.error.userNameAndPasswordRequired(res);
    }
  
    const userQuery = await query.auth.getUserByName(username);
  
    if (!userQuery.rows.length) {
      return response.error.userNotFound(res);
    }
  
    const user = userQuery.rows[0];
    if (!user.active) {
      return response.error.userDeletedOrDeactivated(res);
    }
  
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response.error.userNameAndPasswordRequired(res);
    }
  
    const accessToken = jwt.createAccessToken({
      username,
      id: user.id,
      admin: user.admin,
    });
    const refreshToken = jwt.createRefreshToken({ username, id: user.id ,admin: user.admin});

    await redis.query.setAccessToken(user.id)(accessToken);
    await redis.query.setRefreshToken(user.id)(refreshToken); 

    const payload = {
      accessToken,
      refreshToken,
      username,
      id: user.id,
      admin: user.admin,
    };
  
    response.success.login(payload)(res);
  };
  
  export default login;
