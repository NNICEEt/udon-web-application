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

    update(productId, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedProduct = await Product.findByIdAndUpdate(productId, {
                    $set: { ...data, updatedAt: config.timezone }
                }, { new: true });
                resolve(updatedProduct);
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },
    //test
    delete(productId) {
        return new Promise(async (resolve, reject) => {
            try {
                await Product.findByIdAndDelete(productId);
                resolve();
            } catch (err) {
                reject(new Error('id: not found'));
            }
        });
    },

    getProducts(req) {
        const qPage = req.query.page || 1;
        const qLimit = req.query.limit || 100;
        const qCategory = req.query.category || '';
        let products;
        return new Promise(async (resolve, reject) => {
            try {
                products = await Product.aggregate([
                    {
                        $match: { categories: { $regex: qCategory, $options: "i" } }
                    },
                    {
                        $skip: (+qPage - 1) * +qLimit
                    },
                    {
                        $limit: +qLimit
                    }
                ])
                resolve(products);
            } catch (err) {
                reject(new Error('not found'))
            }
        });
    },

    getProduct(productId) {
        return new Promise(async (resolve, reject) => {
            try {
                const product = await Product.findById(productId);
                resolve(product);
            } catch (err) {
                reject(new Error('id: not found'))
            }
        });
    }

}

module.exports = { ...methods };