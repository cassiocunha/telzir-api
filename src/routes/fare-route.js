const fareHandler = require('../handlers/fare-handler');
const fareSchema = require('../schemas/fare-schema')

module.exports = [
    {
        method: 'POST',
        path: '/fare',
        handler: fareHandler.create,
        options: {
            validate: {
                payload: fareSchema
            }
        }
    }
];