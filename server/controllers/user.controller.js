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
            res.status(200).json(user);
            console.log(req.body.accessToken);
        } catch (err) {
            res.status(400).json(err.message);
        }

    },

    async onGetUserInfo(req,res) {
        try {
            const user = await Services.getUserInfo(req.params.id)
            res.status(200).json(user)
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onUpdate(req, res) {
        try {
            const user = await Services.update(req.params.id, req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json(err.message)
        }
    },

    async onDelete(req, res) {
        try {
            await Services.delete(req.params.id);
            res.status(204).json('User has been deleted...');
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onLogout(req, res) {
        try {
            await Services.logout(req.body.accessToken);
            res.sendStatus(204);
        } catch (err) {
            
        }
    }
}

module.exports = { ...methods };