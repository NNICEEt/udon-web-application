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

productSchema.pre('save', async function(next) {
    
    next();
});

module.exports = mongoose.model("Product", productSchema);