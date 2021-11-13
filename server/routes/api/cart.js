const router = require('express').Router();
const controllers = require('../../controllers/cart.controller');
const { auth, authAdmin } = require('../auth');

router.get('/', controllers.onGetCart);
router.post('/', controllers.onInsert);
router.put('/:cartId', controllers.onUpdate);
router.delete('/:cartId', controllers.onDelete);
router.delete('/', controllers.onDeleteAll);

module.exports = router;