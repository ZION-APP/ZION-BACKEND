const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
  firstname: joi.string().max(100),
  lastname: joi.string().max(100),
  username: joi.string().max(100),
  email: joi.string().email().required(),
  password: joi.string().max(20).required()
};

module.exports = {
    userIdSchema,
    createUserSchema,
};