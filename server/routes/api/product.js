const router = require('express').Router();
const controllers = require('../../controllers/product.controller');
const { auth, authAdmin } = require('../auth');

router.get('/', controllers.onGetProducts);
router.get('/:productId', controllers.onGetProduct);
router.post('/', authAdmin, controllers.onInsert);
router.put('/:productId', auth, controllers.onUpdate);
router.delete('/:productId', authAdmin, controllers.onDelete);

module.exports = router;