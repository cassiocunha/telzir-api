const customerRepository = require('../repositories/customer-repository');
const { ERR_CUSTOMER_ALREADY_EXISTS } = require('../utils/error-type');
const hash = require('../auth/hash');

const createCustomer = async customerData => {
    const exists = await customerRepository.customerExists(customerData.email);
    if (exists) {
        throw new Error(ERR_CUSTOMER_ALREADY_EXISTS);
    }
    const passwordHashed = await hash.make(customerData.password);
    customerData.password = passwordHashed;
    const customer = await customerRepository.create(customerData);
    return customer;
};

module.exports = {
    createCustomer
};