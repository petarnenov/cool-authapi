import bcrypt from "bcrypt";
import response from "../response/index.js";
import query from "../query/index.js";

const signUp = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return response.error.userNameAndPasswordRequired(res);
  }

  const result = await query.auth.getUserByName(username);
  if (result.rows.length) {
    return response.error.userAlreadyExists(res);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const userQuery = await query.auth.createUser({
    username,
    password: hashPassword,
  });

  const newUser = userQuery.rows[0];

  response.success.auth.signUp({ ...newUser })(res);
};

export default signUp;
