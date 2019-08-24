const productHandler = require('../handlers/product-handler');
const productSchema = require('../schemas/product-schema')

module.exports = [
    {
        method: 'POST',
        path: '/product',
        handler: productHandler.create,
        options: {
            validate: {
                payload: productSchema
            }
        }
    },
    {
        method: 'GET',
        path: '/product/{slug}',
        handler: productHandler.getBySlug
    }
];