const joi = require('@hapi/joi');

const userIdSchema = joi.number();

const createUserSchema = {
  firstname: joi.string().max(100),
  lastname: joi.string().max(100),
  username: joi.string().max(100),
  email: joi.string().email().required(),
  password: joi.string().max(20).required(),
  identity_number: joi.string().max(10).required(),
  phone: joi.string(),
  url_profile: joi.string(),
  kind_of_person_id: joi.number(),
  is_form_complete: joi.boolean(),
};

const updateUserSchema = {
  firstname: joi.string().max(100),
  lastname: joi.string().max(100),
  username: joi.string().max(100),
  // email: joi.string().email().required(),
  // identity_number: joi.string(),
  phone: joi.string().max(13),
  url_profile: joi.string(),
  // kind_of_type: joi.string(),
  is_form_complete: joi.boolean(),
};

const updateUserPasswordSchema = {
  password: joi.string().max(20).required(),
  new_password: joi.string().max(20).required()
}

const updateUserProfileSchema = {
  url_profile: joi.string().required()
}

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
  updateUserProfileSchema,
  updateUserPasswordSchema
};
