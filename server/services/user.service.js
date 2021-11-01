const User = require('../models/User');

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
                const oldUser = await User.findByIdAndUpdate(id, data);
                const { password, ...user } = Object.assign(oldUser, data)._doc;
                resolve({ ...user });
            } catch (err) {
                reject(new Error('id: not found'));
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
                if (!userData.validPassword(data.password)) reject(new Error('incorrect password'));
                const { username, isAdmin } = userData;
                const user = { username, isAdmin };
                const { password, ...others } = userData._doc;
                const accessToken = userData.genJWT(user);
                resolve({ ...others, accessToken: accessToken });
            } catch (err) {
                reject(err);
            }
        });
    }

    // refreshToken


}

module.exports = { ...methods };