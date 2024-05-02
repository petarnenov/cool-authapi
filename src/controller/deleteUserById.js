import response from "../response/index.js";

const deleteUserById = (req, res) => {
  res
    .status(200)
    .json(response.success.users(req.user, response.success.USERS.DELETE_USER));
};

export default deleteUserById;
