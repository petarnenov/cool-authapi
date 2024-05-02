import response from "../response/index.js";

export const logout = async (req, res) => {
  res
    .status(200)
    .json(response.success.auth(req.user, response.success.AUTH.LOGOUT));
};

export default logout;
