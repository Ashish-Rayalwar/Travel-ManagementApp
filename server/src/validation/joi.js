const Joi = require("joi");
const userValidation = Joi.object({
  name: Joi.string().min(3).max(10).required().lowercase(),
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().max(15).min(7).required(),
});

const loginValidation = Joi.object({
  email: Joi.string().required().email().lowercase(),
  password: Joi.string().max(15).min(7).required(),
});

module.exports = {
  userValidation,
  loginValidation,
};
