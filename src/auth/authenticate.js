const Token = require('./token');
const Cache = require('../repositories/cache-repository');
const customerRepository = require('../repositories/customer-repository');
const { LOGIN_EXPIRATION_TIME, BLACKLIST_CACHE_PREFIX } = require('./config');
const hash = require('./hash');
const {
    ERR_USER_NOT_FOUND,
    ERR_INVALID_PASSWORD,
} = require('../utils/error-type');
const boom = require('boom');

const login = async (email, password) => {
    const customer = await customerRepository.findByEmail(email);
    if (!customer) {
        throw new Error(ERR_USER_NOT_FOUND);
    }
    const isPasswordValid = await hash.compare(password, customer.password);
    if (!isPasswordValid) {
        throw new Error(ERR_INVALID_PASSWORD);
    }
    const JWTData = {
        exp: Math.floor(Date.now() / 1000) + LOGIN_EXPIRATION_TIME,
        sub: customer.id,
        iss: 'telzir-api',
        data: {
            user_id: customer.id,
        }
    };

    const token = await Token.generate(JWTData);
    return { customer, token };
};

const logout = token => {
    Cache.set(`${BLACKLIST_CACHE_PREFIX}${token}`, 1, LOGIN_EXPIRATION_TIME);
};

module.exports = {
    login,
    logout
};