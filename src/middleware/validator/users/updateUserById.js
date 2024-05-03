import Joi from "joi";
import response from "../../../response/index.js";

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
    return next(
      response.error.auth(error || errorParams, response.COMMON.BAD_REQUEST),
    );
  }

  next();
};

export default updateUserById;
