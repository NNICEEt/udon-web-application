const router = require('express').Router();
const controllers = require('../../controllers/product.controller');
const { auth, authAdmin } = require('../auth');

router.get('/', controllers.onGetProducts);
router.get('/:id', controllers.onGetProduct);
router.post('/', auth, controllers.onInsert);
router.put('/:id', auth, controllers.onUpdate);
router.delete('/:id', auth, controllers.onDelete);

module.exports = router;