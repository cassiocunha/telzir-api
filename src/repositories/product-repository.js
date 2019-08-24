const ProductModel = require('../models/product-model');

const create = productData => {
    const productModel = new ProductModel(productData);
    return productModel.save();
};

const getBySlug = slug => {
    return ProductModel.findOne({active: true, slug: slug}, 'name slug')
    .populate({path: 'plans', match: {active: true}, select: 'name slug'});
};

module.exports = {
    create,
    getBySlug
};