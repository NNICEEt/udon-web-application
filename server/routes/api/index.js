const router = require('express').Router();
const auth = require('../auth');

router.use('/users', require('./user'));
router.use('/products', auth, require('./product'));
router.use('/cart', auth, require('./cart'));
router.use('/order', auth, require('./order'));

router.get('/', (req,res) => {
    res.json({
        message: "Hey there! Welcome to Udon Web API service"
    })
});

module.exports = router;