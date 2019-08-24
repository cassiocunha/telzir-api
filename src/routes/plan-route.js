const planHandler = require('../handlers/plan-handler');
const planSchema = require('../schemas/plan-shema')

module.exports = [
    {
        method: 'POST',
        path: '/plan',
        handler: planHandler.create,
        options: {
            validate: {
                payload: planSchema
            }
        }
    },
    {
        method: 'POST',
        path: '/plan/summary',
        handler: planHandler.getPlanSummary
    }
];