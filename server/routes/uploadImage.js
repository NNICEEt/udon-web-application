const multer = require('multer');

const userStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/users')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${Date.now().toString()}.${file.originalname.split('.')[1]}`)
    }
});

const productStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads/users')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${Date.now().toString()}.${file.originalname.split('.')[1]}`)
    }
});

const userUpload = multer({ storage: userStorage }).single('file');
const productUpload = multer({ storage: productStorage }).single('file');

module.exports = { userUpload, productUpload }