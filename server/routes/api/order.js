const router = require('express').Router();
const controllers = require('../../controllers/order.controller');
const { auth, authAdmin } = require('../auth');

router.get('/', auth, controllers.onGetOrders);
router.post('/', auth, controllers.onInsert);
router.put('/:orderId', authAdmin, controllers.onUpdate);
router.delete('/:orderId', auth, controllers.onCancel);

module.exports = router;