import response from "../response/index.js";

const getUserById = (req, res) => {
  res
    .status(200)
    .json(
      response.success.users(req.user, response.success.USERS.GET_USER_BY_ID),
    );
};

export default getUserById;
