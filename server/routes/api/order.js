const router = require('express').Router();
const controllers = require('../../controllers/order.controller');
const { auth, authAdmin } = require('../auth');

router.get('/', controllers.onGetOrders);
router.post('/', controllers.onInsert);
router.put('/:orderId', controllers.onUpdate);
router.delete('/:orderId', controllers.onCancel);

module.exports = router;