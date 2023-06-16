const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../utils/constants');
const UnauthorizedError = require('../errors/authorizationError');

const { UNAUTHORIZED_ERROR_MESSAGE } = require('../errors/errorMessage');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
  }
  req.user = payload;
  return next();
};

module.exports = {
  auth,
};
