const FareModel = require('../models/fare-model');

const create = fareData => {
    const fareModel = new FareModel(fareData);
    return fareModel.save();
};

const getFare = (originCode, destinationCode) => {
    return FareModel.findOne({ originCode: originCode, destinationCode: destinationCode });
}

const fareExists = (originCode, destinationCode) => {
    return FareModel.exists({ originCode: originCode, destinationCode: destinationCode });
};

module.exports = {
    create,
    fareExists,
    getFare
};


