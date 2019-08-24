const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlanSchema = new Schema({
    name: String,
    slug: String,
    price: Number,
    freeMinutes: Number,
    createDate: Date,
    active: Boolean,
    exceededMinutePercent: Number
});

module.exports = mongoose.model('Plan', PlanSchema);