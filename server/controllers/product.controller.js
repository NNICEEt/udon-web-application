const Services = require('../services/product.service');

const methods = {
    // async onRegister(req, res) {
    //     try {
    //         const result = await Services.insert(req.body);
    //         res.status(201).json(result);
    //     } catch (err) {
    //         res.status(400).json(err);
    //     }
    // }

    async insert(req,res) {
        try {
            const result = await Services.insert(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    }
}

module.exports = { ...methods };