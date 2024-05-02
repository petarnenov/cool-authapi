import response from "../response/index.js";

const refresh = async (req, res) => { 

  res.status(200).json(response.success.auth(req.user,response.success.AUTH.REFRESH));
};

export default refresh;
