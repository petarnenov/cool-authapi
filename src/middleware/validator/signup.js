import Joi from "joi";

const signupSchema = Joi.object({
  username: Joi.string().min(2).max(30).required(),
  password: Joi.string().min(2).max(30).required(),
});

const signup = (req, res, next) => {  
  const { error } = signupSchema.validate(req.body);  

  if (error) {
    return next(error);
  }

  next();
};

export default signup;
