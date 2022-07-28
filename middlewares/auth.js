const jwt = require('jsonwebtoken');
const AuthoriseError = require('../errors/AuthoriseError');

// const { JWT_SECRET = 'super-secret-key' } = process.env;
const JWT_SECRET = 'super-secret-key';

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new AuthoriseError('Необходима авторизация'));
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthoriseError('Необходима авторизация.'));
  }

  req.user = payload;

  return next();
};
