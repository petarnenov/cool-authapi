import response from "../response/index.js";

const getAllUsers = (req, res) => {
  res
    .status(200)
    .json(response.success.users(req.users, response.success.USERS.GET_USERS));
};

export default getAllUsers;
