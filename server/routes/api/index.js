const router = require('express').Router();

router.use('/users', require('./user'));
router.use('/products', require('./product'));
router.use('/cart', require('./cart'));
router.use('/order', require('./order'));

router.get('/', (req,res) => {
    res.json({
        message: "Hey there! Welcome to Udon Web API service"
    })
});

module.exports = router;