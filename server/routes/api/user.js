const router = require('express').Router();
const controllers = require('../../controllers/user.controller');
const { auth } = require('../auth');
const { userUpload } = require('../uploadImage');

router.get('/', auth, controllers.onGetUserInfo);
router.put('/', auth, controllers.onUpdate);
router.put('/password', auth, controllers.onUpdatePassword);
router.delete('/delete', auth, controllers.onDelete);
router.put('/file', auth, userUpload, controllers.onUpload);

router.post("/register", controllers.onRegister);
router.post('/login', controllers.onLogin);
router.post('/login-admin', controllers.onLoginAdmin);
router.delete('/logout', controllers.onLogout);
router.post('/refresh-token', controllers.onRefreshToken);

module.exports = router;