const Joi = require('@hapi/joi');

module.exports = {
    name: Joi.string().min(1).max(15).required(),
    price: Joi.number().precision(2).greater(0).required(),
    createDate: Joi.date().valid(Date.now).default(Date.now, 'When created'),
    freeMinutes: Joi.number().precision(0).greater(0).required(),
    exceededMinutePercent: Joi.number().precision(2).required(),
    slug: Joi.string().min(1).max(15).required(),
    active: Joi.boolean().valid(true).default(true)
};