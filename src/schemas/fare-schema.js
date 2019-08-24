const Joi = require('@hapi/joi');

module.exports = {
    originCode: Joi.string().min(3).max(3).required(),
    destinationCode: Joi.string().min(3).max(3).required(),
    minutePrice: Joi.number().precision(2).greater(0).required(),
    active: Joi.boolean().valid(true).default(true)
};