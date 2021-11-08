const jwt = require('jsonwebtoken');
const config = require('../configs/app.config');

const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.accessToken, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

const auth = (req, res, next) => {
  verifyAccessToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.sendStatus(403);
    }
  });
}

const authAdmin = (req, res, next) => {
  verifyAccessToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  });
}

module.exports = { auth, authAdmin };