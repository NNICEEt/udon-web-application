const mongoose = require('mongoose');
const config = require('../configs/app.config');

const orderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: { type: String },
                quantity: { type: Number },
                price: { type: Number }
            }
        ],
        totalPrice: { type: Number, required: true },
        address: {
            mainAddress: { type: String, required: true },
            district: { type: String, required: true },
            province: { type: String, required: true },
            postcode: { type: String, required: true }
        },
        status: { type: String, default: "กำลังดำเนินการ" },
        createdAt: { type: Date, default: config.timezone },
        updatedAt: { type: Date, default: config.timezone }
    }
);

module.exports = mongoose.model("Order", orderSchema);