const mongoose = require('mongoose');
const config = require('../configs/app.config');

const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        createdAt: { type: Date, default: config.timezone },
        updatedAt: { type: Date, default: config.timezone }
    },
);

module.exports = mongoose.model("Cart", cartSchema);