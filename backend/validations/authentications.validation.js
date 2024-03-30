import Joi from "joi";

const validateSignUp = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3).max(10).label("Username"),
    password: Joi.string().required().min(6).max(20).label("Password"),
  });

  return schema.validate(data);
};

const validateSignIn = (data) => {
  return validateSignUp(data);
};

export { validateSignUp, validateSignIn };
