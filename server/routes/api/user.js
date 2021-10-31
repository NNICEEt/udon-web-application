const router = require('express').Router();
const controllers = require('../../controller/user.controller');


router.put('/:id', controllers.onUpdate);
router.delete('/:id', controllers.onDelete);
router.post("/register", controllers.onRegister);
router.post('/login', controllers.onLogin);
router.post('/refresh-token');

module.exports = router;