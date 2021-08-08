const joi = require('@hapi/joi');

const bankAccountIdSchema = joi.string().regex(/^[0-9]{1,50}$/);

const createBankAccountSchema = {
  owner_name: joi.string().max(100).required(),
  identity_number: joi.string().max(13).required(),
  number_account: joi.string().max(20).required(),
  financial_entity_id: joi.number().required(),
  bank_account_type_id: joi.number().required(),
  status: joi.string().max(10),
};

const updateBankAccountSchema = {
  owner_name: joi.string().max(100),
  identity_number: joi.string().max(13),
  number_account: joi.string().max(20),
  financial_entity_id: joi.number(),
  bank_account_type_id: joi.number(),
  status: joi.string().max(10),
};

module.exports = {
  bankAccountIdSchema,
  createBankAccountSchema,
  updateBankAccountSchema,
};
