const Services = require('../services/product.service');

const methods = {

    async onInsert(req, res) {
        try {
            await Services.insert(req.body);
            res.status(201).json("success");
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async onUpdate(req, res) {
        try {
            const result = await Services.update(req.params.productId, req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async onDelete(req, res) {
        try {
            await Services.delete(req.params.productId);
            res.status(204).json('Product has been deleted...');
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onGetProducts(req, res) {
        try {
            const result = await Services.getProducts(req);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onGetProduct(req, res) {
        try {
            const result = await Services.getProduct(req.params.productId);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
}

module.exports = { ...methods };