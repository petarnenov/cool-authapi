import response from "../response/index.js";

const getUserById = (req, res) => {
  res
    .status(200)
    .json(response.success.users(req.user, response.USERS.GET_USER_BY_ID));
};

export default getUserById;
