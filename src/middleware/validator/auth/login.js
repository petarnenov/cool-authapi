import Joi from "joi";
import response from "../../../response/index.js";

const loginSchema = Joi.object({
  username: Joi.string().min(2).max(30).required(),
  password: Joi.string().min(2).max(30).required(),
});

const login = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  
  if (error) {
    return next(response.error.auth(error, response.COMMON.BAD_REQUEST));
  }

  next();
};

export default login;
