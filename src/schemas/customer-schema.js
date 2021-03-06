const Joi = require('@hapi/joi');

module.exports = {
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
};