const customerHandler = require('../handlers/customer-handler');
const customerSchema = require('../schemas/customer-schema')

module.exports = [
    {
        method: 'POST',
        path: '/customer',
        handler: customerHandler.create,
        options: {
            validate: {
                payload: customerSchema
            }
        }
    }
];