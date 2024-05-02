import response from "../response/index.js";

const signup = async (req, res) => {
  res
    .status(200)
    .json(response.success.auth(req.user, response.success.AUTH.SIGNUP));
};

export default signup;
