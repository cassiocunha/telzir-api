const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: String,
    createDate: Date,
    active: Boolean,
    slug: {
        type: String,
        unique: true
    },
    plans: [
        {
            type: Schema.ObjectId,
            ref: 'Plan'
        }
    ]
});

module.exports = mongoose.model('Product', ProductSchema);