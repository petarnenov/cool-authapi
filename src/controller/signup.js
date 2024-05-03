import response from "../response/index.js";

const signup = (req, res) => {
  res.status(200).json(response.success.auth(req.user, response.AUTH.SIGNUP));
};

export default signup;
