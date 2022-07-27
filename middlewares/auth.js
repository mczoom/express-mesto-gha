const jwt = require('jsonwebtoken');
const AuthoriseError = require('../errors/AuthoriseError');

const { JWT_SECRET = 'super-secret-key' } = process.env;

module.exports.auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    return next(new AuthoriseError('Необходима авторизация'));
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new AuthoriseError('Необходима авторизация.'));
  }

  req.user = payload;

  return next();
};
