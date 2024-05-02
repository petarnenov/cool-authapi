import Joi from "joi";

const deleteUserByIdSchema = Joi.string().min(1).required();

const deleteUserById = (req, res, next) => {
  const { error } = deleteUserByIdSchema.validate(req.params.id);

  if (error) {
    return next(error);
  }

  next();
};

export default deleteUserById;
