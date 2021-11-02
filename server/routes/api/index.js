const router = require('express').Router();
const { auth } = require('../auth');

router.use('/users', require('./user'));
router.use('/products', require('./product'));
router.use('/carts', auth, require('./cart'));
router.use('/orders', auth, require('./order'));

router.get('/', (req, res) => {
    res.json({
        message: "Hey there! Welcome to Udon Web API service"
    })
});

module.exports = router;