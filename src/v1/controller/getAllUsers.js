import response from "../response/index.js";

const getAllUsers = (req, res) => {
  res
    .status(200)
    .json(
      response.success.users(
        { ...req.user, ...req.users },
        response.USERS.GET_USERS,
      ),
    );
};

export default getAllUsers;
