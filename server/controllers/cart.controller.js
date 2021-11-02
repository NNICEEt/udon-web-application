const Services = require('../services/card.service');

const methods = {

    async onInsert(req, res) {
        try {
            const result = await Services.insert(req.user.id, req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async onUpdate(req, res) {
        try {
            const result = await Services.update(req.params.cartId, req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async onDelete(req, res) {
        try {
            await Services.delete(req.params.cartId);
            res.status(204).json('Product has been deleted...');
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onGetCart(req, res) {
        try {
            const result = await Services.getCart(req.user.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
}

module.exports = { ...methods };