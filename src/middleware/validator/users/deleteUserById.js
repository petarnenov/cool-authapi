import Joi from "joi";
import response from "../../../response/index.js";

const deleteUserByIdSchema = Joi.string().min(1).required();

const deleteUserById = (req, res, next) => {
  const { error } = deleteUserByIdSchema.validate(req.params.id);

  if (error) {
    return next(response.error.auth(error, response.COMMON.BAD_REQUEST));
  }

  next();
};

export default deleteUserById;
