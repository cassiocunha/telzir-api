const Joi = require('@hapi/joi');

module.exports = {
    name: Joi.string().min(1).max(15).required(),
    createDate: Joi.date().valid(Date.now).default(Date.now, 'When created'),
    active: Joi.boolean().valid(true).default(true),
    slug: Joi.string().min(1).max(15).required(),
    plans: Joi.array().items(Joi.string())
};