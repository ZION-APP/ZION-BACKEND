const joi = require('@hapi/joi');

const userIdSchema = joi.number();

const createUserSchema = {
  firstname: joi.string().max(100),
  lastname: joi.string().max(100),
  username: joi.string().max(100),
  email: joi.string().email().required(),
  password: joi.string().max(20).required(),
  identity_number: joi.string().required(),
  phone: joi.string(),
  url_profile: joi.string(),
};

const updateUserSchema = {
  firstname: joi.string().max(100),
  lastname: joi.string().max(100),
  username: joi.string().max(100),
  // email: joi.string().email().required(),
  // identity_number: joi.string(),
  phone: joi.string(),
  url_profile: joi.string(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
};
