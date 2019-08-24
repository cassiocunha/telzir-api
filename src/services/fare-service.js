const fareRepository = require('../repositories/fare-repository');
const { ERR_FARE_ALREADY_EXISTS } = require('../utils/error-type');

const createFare = async fareData => {
    const exists = await fareRepository.fareExists(fareData.originCode, fareData.destinationCode);
    if (exists) {
        throw new Error(ERR_FARE_ALREADY_EXISTS);
    }
    const fare = await fareRepository.create(fareData);
    return fare;
};

module.exports = {
    createFare
};