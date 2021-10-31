const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        titel: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        categories: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);