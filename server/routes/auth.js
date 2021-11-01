const jwt = require('jsonwebtoken');
const config = require('../configs/app.config');

const auth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if(!token) return res.status(401).send("Unauthorized")

  try {
    const decoded = jwt.verify(token, config.accessToken);
    req.user = decoded;
    next()
  } catch (err) {
    res.status(403).send('Forbidden');
  }
}

module.exports = auth;