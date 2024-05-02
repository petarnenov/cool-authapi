import Joi from "joi";

const loginSchema = Joi.object({
  username: Joi.string().min(2).max(30).required(),
  password: Joi.string().min(2).max(30).required(),
});

const login = (req, res, next) => {  
  const { error } = loginSchema.validate(req.body);  

  if (error) {
    return next(error);
  }

  next();
};

export default login;
