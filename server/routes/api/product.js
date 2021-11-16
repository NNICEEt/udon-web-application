const router = require('express').Router();
const controllers = require('../../controllers/product.controller');
const { auth, authAdmin } = require('../auth');
const { productUpload } = require('../uploadImage');

router.get('/', controllers.onGetProducts);
router.get('/:productId', controllers.onGetProduct);
router.post('/', authAdmin, controllers.onInsert);
router.put('/:productId', auth, controllers.onUpdate);
router.delete('/:productId', authAdmin, controllers.onDelete);
router.post('/file', authAdmin, productUpload, controllers.onUpload);

module.exports = router;