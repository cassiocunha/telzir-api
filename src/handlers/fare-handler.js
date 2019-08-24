const fareService = require('../services/fare-service');
const boom = require('boom');
const { ERR_FARE_ALREADY_EXISTS } = require('../utils/error-type');

const create = async (req, h) => {
    try {
        const fareData = req.payload;
        const newFare = await fareService.createFare(fareData);
        return h.response(newFare).code(201);
    } catch (error) {
        switch(error.message) {
            case ERR_FARE_ALREADY_EXISTS:
                throw boom.badData('Tarifa já cadastrada');
            default:
                throw boom.badImplementation(error);
        }
    }
};

module.exports = {
    create
};
