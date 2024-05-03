import response from "../response/index.js";

const login = async (req, res) => {
  console.log("login", req.user);
  res.status(200).json(response.success.auth(req.user, response.AUTH.LOGIN));
};

export default login;
