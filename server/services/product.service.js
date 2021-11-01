const Product = require('../models/Product');
const config = require('../configs/app.config');

const methods = {

    insert(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const productObj = new Product(data);
                await productObj.save();
                resolve(productObj);
            } catch (err) {
                reject(err);
            }
        });
    },

    update(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(id, {
                    $set: { ...data, updatedAt: config.timezone }
                }, { new: true });
                resolve(updatedProduct);
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    delete(id) {
        return new Promise(async (resolve, reject) => {
            try {
                await Product.findByIdAndDelete(id);
                resolve();
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    getProducts(req) {
        return new Promise(async (resolve, reject) => {
            const qPage = req.query.page || 1;
            const qLimit = req.query.limit || 10;
            const qCategory = req.query.category;
            try {
                const countAllProducts = await Product.find().count();
                let products = await Product.find();

                if (countAllProducts > qLimit && qCategory) {
                    products = await Product
                        .find({ categories: qCategory })
                        .skip((qPage - 1) * qLimit)
                        .limit(qLimit);
                } else if (countAllProducts > qLimit) {
                    products = await Product
                        .find()
                        .skip((qPage - 1) * qLimit)
                        .limit(qLimit);
                } else if (qCategory) {
                    products = await Product
                        .find({ categories: qCategory });
                }
                resolve(products);
            } catch (err) {
                reject(new Error('not found'))
            }
        });
    },

    getProduct(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findById(id);
                resolve(product);
            } catch (err) {
                reject(new Error('id: not found'))
            }
        });
    }

}

module.exports = { ...methods };