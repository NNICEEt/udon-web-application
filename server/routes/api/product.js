const router = require('express').Router();
const controllers = require('../../controllers/product.controller');
const auth = require('../auth');

router.post('/', auth, controllers.insert);

module.exports = router;