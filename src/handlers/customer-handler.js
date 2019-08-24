const customerService = require('../services/customer-service');
const { ERR_CUSTOMER_ALREADY_EXISTS } = require('../utils/error-type');
const boom = require('boom');


const create = async (req, h) => {
    try {
        const customerData = req.payload;
        const newCustomer = await customerService.createCustomer(customerData);
        return h.response(newCustomer).code(201);
    } catch(error) {
        switch(error.message) {
            case ERR_CUSTOMER_ALREADY_EXISTS:
                throw boom.badData('Cliente já cadastrado');
            default:
                throw boom.badImplementation(error);
        }
    }
};

module.exports = {
    create
};