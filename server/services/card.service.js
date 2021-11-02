const Cart = require('../models/Cart');
const config = require('../configs/app.config');

const methods = {

    insert(userId, product) {
        return new Promise(async (resolve, reject) => {
            try {
                const cartObj = new Cart({ userId, ...product });
                await cartObj.save();
                resolve(cartObj);
            } catch (err) {
                reject(err);
            }
        });
    },

    update(cartId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedCart = await Cart.findByIdAndUpdate(cartId, {
                    $set: { ...data, updatedAt: config.timezone }
                }, { new: true });
                resolve(updatedCart);
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    delete(cartId) {
        return new Promise(async (resolve, reject) => {
            try {
                await Cart.findByIdAndDelete(cartId);
                resolve();
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    getCart(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const cart = await Cart.find({ userId: userId });
                resolve(cart);
            } catch (err) {
                reject(new Error('id: not found'))
            }
        });
    }

}

module.exports = { ...methods };