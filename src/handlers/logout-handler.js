const boom = require('boom');
const auth = require('../auth/authenticate');
const customerRepository = require('../repositories/customer-repository');

const logout = async (req, h) => {
    const { credentials, token } = req.auth;
    try {
        await Promise.all([
            auth.logout(token),
            customerRepository.removeCache(credentials.data.user_id),
        ]);
        return h.response().code(200);
    } catch (e) {
        console.error(e);
        throw boom.badImplementation();
    }
};

module.exports = {
  logout,
};