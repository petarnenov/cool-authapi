import Joi from "joi";

const updateUserByIdBodySchema = Joi.object({
  active: Joi.bool(),
  password: Joi.string().min(2).max(30),
  admin: Joi.bool(),
});

const updateUserByIdParamsSchema = Joi.string().min(1).required();

const updateUserById = (req, res, next) => {
  const { error } = updateUserByIdBodySchema.validate(req.body);
  const { error: errorParams } = updateUserByIdParamsSchema.validate(
    req.params.id,
  );

  if (error || errorParams) {
    return next(error || errorParams);
  }

  next();
};

export default updateUserById;
