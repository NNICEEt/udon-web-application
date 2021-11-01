const User = require('../models/User');
const config = require('../configs/app.config');
const bcrypt = require('bcrypt');

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
                const { username, isAdmin } = userData;
                const user = { username, isAdmin };
                const { password, ...others } = userData._doc;
                const accessToken = userData.genJWT(user);
                resolve({ ...others, accessToken: accessToken });
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
                const { username, isAdmin } = userData;
                if(!isAdmin) reject(new Error('admin: permission error!!!'))
                const user = { username, isAdmin };
                const { password, ...others } = userData._doc;
                const accessToken = userData.genJWT(user);
                resolve({ ...others, accessToken: accessToken });
            } catch (err) {
                reject(err);
            }
        });
    },

    logout(accessToken) {
        return new Promise(async (resolve, reject) => {
            try {

            } catch (err) {
                reject(err);
            }
        });
    }

    // refreshToken


}

module.exports = { ...methods };