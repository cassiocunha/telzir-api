const mongoose = require('mongoose');

const { Schema } = mongoose;

const CustomerSchema = new Schema({
    name: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Customer', CustomerSchema);