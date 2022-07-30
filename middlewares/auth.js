const jwt = require('jsonwebtoken');
const AuthoriseError = require('../errors/AuthoriseError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key');
  } catch (err) {
    throw new AuthoriseError('Необходима авторизация');
  }
  req.user = payload;

  next();
};
