import response from "../response/index.js";

const login = async (req, res) => {
  res.status(200).json(response.success.auth(req.user, response.AUTH.LOGIN));
};

export default login;
