const joi = require('@hapi/joi');

const goalIdSchema = joi.string().regex(/^[0-9]{1,50}$/);

const createGoalSchema = {
    name: joi.string().max(100).required(),
    target_amount: joi.number().required(),
    montly_amount: joi.number(),
    current_amount: joi.number(),
    target_date: joi.date().required(),
    status: joi.string().max(10)
};

module.exports = {
    goalIdSchema,
    createGoalSchema,
};