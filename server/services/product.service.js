const Product = require('../models/Product');

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
    }

}

module.exports = { ...methods };