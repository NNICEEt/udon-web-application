const Services = require('../services/user.service');

const handleErrors = (err) => {
    let errors = {
        username: '',
        email: '',
        phone: ''
    }
    Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.path;
    });
    return errors;
}

const methods = {
    async onRegister(req, res) {
        try {
            const result = await Services.insert(req.body);
            res.status(201).json(result);
        } catch (err) {
            res.json({result:false, errors:handleErrors(err)});
        }
    },

    async onLogin(req, res) {
        try {
            const result = await Services.login(req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err.message);
        }

    },

    async onLoginAdmin(req, res) {
        try {
            const result = await Services.loginAdmin(req.body);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err.message);
        }

    },

    async onRefreshToken(req, res) {
        try {
            const result = await Services.refreshToken(req);
            res.status(result.status).json(result);
        } catch (err) {
            res.json(err);
        }
    },

    async onGetUserInfo(req, res) {
        try {
            const result = await Services.getUserInfo(req.user.id)
            res.status(200).json(result)
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onUpdate(req, res) {
        try {
            const result = await Services.update(req.user.id, req.body, req.file);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onUpdatePassword(req, res) {
        try {
            await Services.updatePassword(req.user.id, req.body.password);
            res.status(200).json("success");
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onDelete(req, res) {
        try {
            await Services.delete(req.user.id);
            res.status(204).json('User has been deleted...');
        } catch (err) {
            res.status(400).json(err.message);
        }
    },

    async onLogout(req, res) {
        try {
            await Services.logout(req);
            res.sendStatus(204);
        } catch (err) {
            res.json(err);
        }
    }
}

module.exports = { ...methods };