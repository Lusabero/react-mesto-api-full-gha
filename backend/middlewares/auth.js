const jwt = require('jsonwebtoken');
const { ApiError } = require('../errors/ApiError');

const { JWT_SECRET = 'some-secret-key' } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw ApiError.unauthirizedError();
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw ApiError.unauthirizedError();
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
