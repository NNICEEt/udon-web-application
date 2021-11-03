const Order = require('../models/Order');
const config = require('../configs/app.config');

const methods = {

    insert(userId, product) {
        return new Promise(async (resolve, reject) => {
            try {
                const orderObj = new Order({ userId, ...product });
                await orderObj.save();
                resolve();
            } catch (err) {
                reject(err);
            }
        });
    },

    update(orderId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedOrder = await Order.findByIdAndUpdate(orderId, {
                    $set: { ...data, updatedAt: config.timezone }
                }, { new: true });
                resolve(updatedOrder);
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    cancel(orderId) {
        return new Promise(async (resolve, reject) => {
            try {
                await Order.findByIdAndDelete(orderId);
                resolve();
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    getOrders(userId) {
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