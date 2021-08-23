const joi = require('@hapi/joi');

const iFundIdSchema = joi.string().regex(/^[0-9]{1,50}$/);

const createIFundSchema = {
    name: joi.string().max(100).required(),
    target_amount: joi.number().required(),
    montly_amount: joi.number(),
    current_amount: joi.number(),
    init_amount: joi.number().min(1).required(),
    target_date: joi.date().required(),
    goal_id: joi.number().required(),
    fund_id: joi.number().required(),
    bank_account_id: joi.number().required(),
    is_new_fund: joi.boolean(),
    status: joi.string().max(10)
};

const updateIFundSchema = {
    name: joi.string().max(100),
    current_amount: joi.number(),
    status: joi.string().max(10)
};

module.exports = {
    iFundIdSchema,
    createIFundSchema,
    updateIFundSchema,
};