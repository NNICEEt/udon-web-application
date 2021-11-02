const User = require('../models/User');
const config = require('../configs/app.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const genAccessToken = (user) => {
    return jwt.sign(user, config.accessToken, {
        expiresIn: config.tokenExp
    });
}

const genRefreshToken = (user) => {
    return jwt.sign(user, config.accessTokenRefresh);
}

const methods = {

    insert(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const userObj = new User(data);
                await userObj.save();
                resolve({ result: "Created" });
            } catch (err) {
                reject(err);
            }
        });
    },

    update(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedUser = await User.findByIdAndUpdate(id, {
                    $set: { ...data, updatedAt: config.timezone }
                }, { new: true });
                const { password, ...updatedOther } = updatedUser._doc;
                resolve({ ...updatedOther });
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    updatePassword(id, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const passwordHash = await bcrypt.hash(password, salt);
                const userObj = await User.findById(id);
                await userObj.updateOne({ password: passwordHash })
                resolve();
            } catch (err) {
                reject(err)
            }
        });
    },

    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await User.findByIdAndDelete(id);
                resolve();
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    getUserInfo(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const userData = await User.findById(id);
                resolve(await userData.userInfoJSON());
            } catch (err) {
                reject(new Error('id: not found'))
            }
        });
    },

    login(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const userData = await User.findOne({ username: data.username });
                if (!userData) reject(new Error('incorrect username'));
                if (!await bcrypt.compare(data.password, userData.password)) reject(new Error('incorrect password'));
                const { _id, username, isAdmin } = userData;
                const user = { id: _id, isAdmin };
                const accessToken = genAccessToken(user);
                const refreshToken = genRefreshToken(user);
                refreshTokens.push(refreshToken);
                resolve({ _id, username, isAdmin, accessToken, refreshToken });
            } catch (err) {
                reject(err);
            }
        });
    },

    loginAdmin(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const userData = await User.findOne({ username: data.username });
                if (!userData) reject(new Error('incorrect username'));
                if (!await bcrypt.compare(data.password, userData.password)) reject(new Error('incorrect password'));
                const { _id, username, isAdmin } = userData;
                if (!isAdmin) reject(new Error('admin: permission error!!!'))
                const user = { id: _id, isAdmin };
                const accessToken = genAccessToken(user);
                const refreshToken = genRefreshToken(user);
                refreshTokens.push(refreshToken);
                resolve({ _id, username, isAdmin, accessToken, refreshToken });
            } catch (err) {
                reject(err);
            }
        });
    },

    refreshToken(req) {
        return new Promise(async (resolve, reject) => {
            try {
                const refreshToken = req.body.token;
                if (refreshToken == null) resolve({ status: 401, message: 'Unauthorized' });
                if (!refreshTokens.includes(refreshToken)) resolve({ status: 403, message: 'Forbidden' });
                jwt.verify(refreshToken, config.accessTokenRefresh, (err, user) => {
                    if (err) resolve({ status: 403, message: 'Forbidden' });
                    const accessToken = genAccessToken({ id: user.id, isAdmin: user.isAdmin })
                    resolve({ status: 200, accessToken });
                });
            } catch (err) {
                reject(err);
            }
        })
    },

    logout(req) {
        return new Promise(async (resolve, reject) => {
            try {
                refreshTokens = refreshTokens.filter(token => token !== req.body.token);
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    }

}

module.exports = { ...methods };