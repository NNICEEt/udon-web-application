const Services = require('../services/user.service');

const methods = {
    async onRegister(req, res) {
        try {
            const result = await Services.insert(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async onLogin(req, res) {
        try {
            const user = await Services.login(req.body);
            res.status(200).json({user: user._id});
        } catch (err) {
            res.status(400).json(err.message);
        }
        
    },

    async onUpdate(req,res) {
        try {
            const user = await Services.update(req.params.id, req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json(err.message)
        }
    },

    async onDelete(req,res) {
        try {
            const user = await Services.delete(req.params.id);
            res.status(204).json('success');
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onRefreshToken(req, res) {
        try {
            const result = await Services.refreshToken(req.body.accessToken);
            res.status()
        } catch (err) {
            res.send(err);
        }
    }
}

module.exports = { ...methods };