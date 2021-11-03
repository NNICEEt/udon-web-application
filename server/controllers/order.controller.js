const Services = require('../services/order.service');

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
            const result = await Services.update(req.params.orderId, req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async onCancel(req, res) {
        try {
            await Services.cancel(req.params.orderId);
            res.status(204).json('Order has been cancelled...');
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onGetOrders(req, res) {
        try {
            const result = await Services.getOrders(req.user.id);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err.message);
        }
    }
}

module.exports = { ...methods };