const router = require('express').Router();
const controllers = require('../../controller/user.controller');
const auth = require('../auth');

router.get('/welcome', auth, (req,res) => {
    const user = req.user;
    res.json(user);
});

router.get('/:id', auth, controllers.onGetUserInfo);
router.put('/:id', auth, controllers.onUpdate);
router.delete('/:id', auth, controllers.onDelete);

router.post("/register", controllers.onRegister);
router.post('/login', controllers.onLogin);
router.post('/refresh-token', controllers.onRefreshToken);

module.exports = router;