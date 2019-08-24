const productRepository = require('../repositories/product-repository');

const create = async (req, h) => {
    const product = await productRepository.create(req.payload);
    return h.response(product).code(201);
};

const getBySlug = async (req, h) => {
    const product = await productRepository.getBySlug(req.params.slug);
    return h.response(product).code(200);
};

module.exports = {
    create,
    getBySlug
};
