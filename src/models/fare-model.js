const mongoose = require('mongoose');

const { Schema } = mongoose;

const FareSchema = new Schema({
    originCode: String,
    destinationCode: String,
    minutePrice: Number,
    active : Boolean,
});

module.exports = mongoose.model('Fare', FareSchema);