const jwt = require('jsonwebtoken');
const AuthoriseError = require('../errors/AuthoriseError');

// const { JWT_SECRET = 'super-secret-key' } = process.env;
// const JWT_SECRET = 'super-secret-key';

module.exports.auth = (req, res, next) => {
  // const token = req.cookies.jwt;
  const { authorisation } = req.headers;
  if (!authorisation || !authorisation.startsWith('Bearer ')) {
    throw new AuthoriseError('Необходима авторизация');
  }
  const token = authorisation.replace('Bearer ', '');
  if (!token) {
    next(new AuthoriseError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    throw new AuthoriseError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
