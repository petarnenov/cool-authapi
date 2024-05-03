import Joi from "joi";
import response from "../../../response/index.js";

const refreshSchema = Joi.object({
  refreshToken: Joi.string().min(100).required(),
});

const refresh = (req, res, next) => {
  const { error } = refreshSchema.validate(req.body);

  if (error) {
    return next(response.error.auth(error, response.COMMON.BAD_REQUEST));
  }

  next();
};

export default refresh;
