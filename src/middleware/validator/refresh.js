import Joi from "joi";

const refreshSchema = Joi.object({
  refreshToken: Joi.string().min(100).required(),
});

const refresh = (req, res, next) => {  
  const { error } = refreshSchema.validate(req.body);  

  if (error) {
    return next(error);
  }

  next();
};

export default refresh;
