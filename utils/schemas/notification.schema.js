const joi = require('@hapi/joi');

const notificationIdSchema = joi.number();

const createNotificationSchema = {
    tittle: joi.string().max(100).required(),
    fecha: joi.date().required(),
    body: joi.string().required(),
    status: joi.string().max(10)
};

module.exports = {
    notificationIdSchema,
    createNotificationSchema
};