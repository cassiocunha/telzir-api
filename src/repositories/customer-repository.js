const CustomerModel = require('../models/customer-model');
const Cache = require('./cache-repository');
const { LOGIN_EXPIRATION_TIME } = require('../auth/config');

const PREFIX_CACHE = 'userId:';

const create = customerData => {
    const customerModel = new CustomerModel(customerData);
    return customerModel.save();
};

const setCache = user => {
    Cache.set(`${PREFIX_CACHE}${user.id}`, JSON.stringify(user), LOGIN_EXPIRATION_TIME)
};

const removeCache = userId => {
    Cache.del(`${PREFIX_CACHE}${userId}`)
};

const findByEmail = email => {
    return CustomerModel.findOne({ email });
};

const customerExists = email => {
    return CustomerModel.exists({ email: email });
};

module.exports = {
    create,
    setCache,
    removeCache,
    findByEmail,
    customerExists
};