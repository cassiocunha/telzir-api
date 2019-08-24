const Joi = require('@hapi/joi');

module.exports = {
    email: Joi.string().email().required().error(new Error("Formato de e-mail inválido")),
    password: Joi.string().min(6).required().error(new Error("Senha deve ter no mínimo 6 caracteres")),
};
