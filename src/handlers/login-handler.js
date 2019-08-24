const authenticate = require('../auth/authenticate');
const customerRepository = require('../repositories/customer-repository');
const boom = require('boom');
const {
    ERR_INVALID_PASSWORD,
    ERR_INVALID_TOKEN,
    ERR_USER_NOT_FOUND,
  } = require('../utils/error-type');

const login = async (req, h) => {
    const { email, password } = req.payload;
    try {
        const { customer, token } = await authenticate.login(email, password);
        await customerRepository.setCache(customer);
        return h.response({ token }).code(200);
    } catch(error) {
        switch(error.message) {
            case ERR_INVALID_PASSWORD:
                throw boom.badData('E-mail ou senha inválido');
            case ERR_INVALID_TOKEN:
                throw boom.badImplementation('Erro ao gerar token');
            case ERR_USER_NOT_FOUND:
                throw boom.notFound('Usuário não encontrado');
            default:
                throw boom.badImplementation(error);
        }
    }
}

module.exports = {
    login
};