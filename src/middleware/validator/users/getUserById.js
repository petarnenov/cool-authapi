import Joi from "joi";
import response from "../../../response/index.js";

const getUserByIdSchema = Joi.string().min(1).required();

const getUserById = (req, res, next) => {
  const { error } = getUserByIdSchema.validate(req.params.id);

  if (error) {
    return next(response.error.auth(error, response.COMMON.BAD_REQUEST));
  }

  next();
};

export default getUserById;
