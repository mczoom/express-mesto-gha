const jwt = require('jsonwebtoken');
const AuthoriseError = require('../errors/AuthoriseError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    throw new AuthoriseError('Необходимо авторизоваться');
  }
  req.user = payload;

  next();
};
