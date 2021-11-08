const User = require('../models/User');
const config = require('../configs/app.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

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
                const newBirthday = new Date(data.birthday).getTime() + (7 * 60 * 60 * 1000);
                const { birthday, ...newData } = data;
                const userObj = new User({ ...newData, birthday: newBirthday });
                await userObj.save();
                resolve({ result: true });
            } catch (err) {
                reject(err);
            }
        });
    },

    update(userId, data, file) {
        return new Promise(async (resolve, reject) => {
            try {
                const userObj = await User.findById(userId);
                let dataToUpdate;
                if (file != null) {
                    dataToUpdate = { photoURL: `${__basedir}/users/${file.filename}`, ...data }
                    oldURL = userObj.photoURL;
                    if (oldURL) fs.unlinkSync(oldURL);
                } else {
                    dataToUpdate = { ...data };
                }

                await userObj.updateOne({ ...dataToUpdate });
                resolve();
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    updatePassword(userId, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                if (password.length < 8 || password.length > 16) reject(new Error('legnth'));
                const passwordHash = await bcrypt.hash(password, salt);
                const userObj = await User.findById(userId);
                await userObj.updateOne({ password: passwordHash })
                resolve();
            } catch (err) {
                reject(err)
            }
        });
    },

    delete(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                await User.findByIdAndDelete(userId);
                resolve();
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    getUserInfo(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const userData = await User.findById(userId);
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
                if (!userData) resolve({ result: false, error: 'username' });
                if (!await bcrypt.compare(data.password, userData.password)) resolve({ result: false, error: 'password' });
                const { _id, username, isAdmin } = userData;
                const user = { id: _id, isAdmin };
                const accessToken = genAccessToken(user);
                const refreshToken = genRefreshToken(user);
                refreshTokens.push(refreshToken);
                resolve({ result: true, token: { accessToken, refreshToken } });
            } catch (err) {
                reject(err);
            }
        });
    },

    loginAdmin(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const userData = await User.findOne({ username: data.username });
                if (!userData) reject({ result: false, error: 'username' });
                if (!await bcrypt.compare(data.password, userData.password)) reject({ result: false, error: 'password' });
                const { _id, username, isAdmin } = userData;
                if (!isAdmin) reject({ result: false, error: 'สำหรับ Admin เท่านั้น' })
                const user = { id: _id, isAdmin };
                const accessToken = genAccessToken(user);
                const refreshToken = genRefreshToken(user);
                refreshTokens.push(refreshToken);
                resolve({ result: true, token: { accessToken, refreshToken } });
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