const Cart = require('../models/Cart');
const config = require('../configs/app.config');

const methods = {

    insert(userId, product) {
        return new Promise(async (resolve, reject) => {
            try {
                const oldCart = await Cart.findOne({ userId: userId, productId: product.productId });
                let cartObj;
                if (oldCart) {
                    console.log('old cart');
                    cartObj = await oldCart.updateOne({ quantity: oldCart.quantity + product.quantity });
                    resolve();
                } else {
                    console.log('new cart');
                    cartObj = new Cart({ userId, ...product });
                    await cartObj.save();
                    resolve(cartObj);
                }
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
                const cart = await Cart.aggregate([
                    { $match: { userId: userId } },
                    {
                        $project: {
                            productObjId: { $toObjectId: "$productId" }, quantity: 1
                        }
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "productObjId",
                            foreignField: "_id",
                            as: "product"
                        }
                    },
                    { $unwind: "$product" },
                    {
                        $project: {
                            product: 1,
                            quantity: 1,
                            totalPrice: { $multiply: ["$quantity", "$product.price"] }
                        }
                    }
                ]);
                
                resolve(cart);
            } catch (err) {
                reject(new Error('id: not found'))
            }
        });
    }

}

module.exports = { ...methods };