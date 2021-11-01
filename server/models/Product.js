const mongoose = require('mongoose');
const config = require('../configs/app.config');

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        categories: { type: String, required: true },
        price: { type: Number, required: true },
        createdAt: { type: Date, default: config.timezone },
        updatedAt: { type: Date, default: config.timezone }
    }
);

productSchema.pre('save', async function (next) {
    next();
});

module.exports = mongoose.model("Product", productSchema);