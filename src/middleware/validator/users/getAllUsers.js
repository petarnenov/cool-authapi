import Joi from "joi";
import response from "../../../response/index.js";

const getAllUsersSchema = Joi.bool().equal(true).required();

const getAllUsers = (req, res, next) => {
  const { error } = getAllUsersSchema.validate(req.user.admin);

  if (error) {
    return next(response.error.auth(error, response.COMMON.UNAUTHORIZED));
  }

  next();
};

export default getAllUsers;
