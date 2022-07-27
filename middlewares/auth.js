const jwt = require('jsonwebtoken');
const AuthoriseError = require('../errors/AuthoriseError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthoriseError('Необходимо авторизоваться'));
  }
  const token = String(req.headers.authorization).replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthoriseError('Необходимо авторизоваться');
  }
  req.user = payload;
  return next();
};
