const router = require('express').Router();
const controllers = require('../../controllers/user.controller');
const { auth } = require('../auth');

router.get('/welcome', auth, (req, res) => {
    const user = req.user;
    res.json(user);
});

router.get('/:id', auth, controllers.onGetUserInfo);
router.put('/:id', auth, controllers.onUpdate);
router.put('/password/:id', auth, controllers.onUpdatePassword);
router.delete('/:id', auth, controllers.onDelete);

router.post("/register", controllers.onRegister);
router.post('/login', controllers.onLogin);
router.post('/login-admin', controllers.onLoginAdmin);
router.delete('/logout', controllers.onLogout);
router.post('/refresh-token', controllers.onLogout);

module.exports = router;