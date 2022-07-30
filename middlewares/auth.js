const jwt = require('jsonwebtoken');
const AuthoriseError = require('../errors/AuthoriseError');

// const { JWT_SECRET = 'super-secret-key' } = process.env;
const JWT_SECRET = 'super-secret-key';

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthoriseError('Необходима авторизация');
  } else {
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new AuthoriseError('Необходима авторизация');
    }

    req.user = payload;

    next();
  }
};
