const User = require('../models/User');
const jwt = require('jsonwebtoken');

const methods = {

    insert(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const userObj = new User(data);
                await userObj.save();
                resolve({result: "Created"});
            } catch (err) {
                reject(err);
            }
        });
    },

    update(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const userObj = await User.findById(id);
                if (!userObj) reject(new Error('id: not found'));
                await User.updateOne({ _id: id }, data);
                resolve(Object.assign(userObj, data));
            } catch (err) {
                reject(err);
            }
        });
    },

    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const userObj = await User.findById(id);
                if (!userObj) reject(new Error('id: not found'));
                await User.deleteOne({ _id: id});
                resolve(userObj);
            } catch (err) {
                reject(err);
            }
        });
    },

    login(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const userObj = await User.findOne({ username: data.username });
                if (!userObj) reject(new Error('incorrect username'));
                const auth = await userObj.validPassword(data.password);
                if (!auth) reject(new Error('incorrect password'));
                resolve(userObj)
            } catch (err) {
                reject(err);
            }
        });
    }


}

module.exports = { ...methods };