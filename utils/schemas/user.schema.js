const joi = require('@hapi/joi');

const userIdSchema = joi.number();

const createUserSchema = {
  firstname: joi.string().max(100),
  lastname: joi.string().max(100),
  username: joi.string().max(100),
  email: joi.string().email().required(),
  password: joi.string().max(20).required(),
  status: joi.string()
};

module.exports = {
    userIdSchema,
    createUserSchema,
};