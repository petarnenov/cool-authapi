import Joi from "joi";

const getAllUsersSchema = Joi.bool().equal(true).required();

const getAllUsers = (req, res, next) => {
  const { error } = getAllUsersSchema.validate(req.user.admin);

  if (error) {
    return next(error);
  }

  next();
};

export default getAllUsers;
