import response from "../response/index.js";

const updateUserById = (req, res) => {
  res
    .status(200)
    .json(response.success.users(req.user, response.USERS.UPDATE_USER));
};

export default updateUserById;
