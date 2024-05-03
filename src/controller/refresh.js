import response from "../response/index.js";

const refresh = (req, res) => {
  res.status(200).json(response.success.auth(req.user, response.AUTH.REFRESH));
};

export default refresh;
