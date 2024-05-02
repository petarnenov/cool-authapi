import Joi from "joi";

const getUserByIdSchema = Joi.string().min(1).required();

const getUserById = (req, res, next) => {
  const { error } = getUserByIdSchema.validate(req.params.id);

  if (error) {
    return next(error);
  }

  next();
};

export default getUserById;
