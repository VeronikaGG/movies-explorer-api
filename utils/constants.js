const OK_CODE = 200;
const CREATE_CODE = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const ERROR_CODE = 500;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const CONFLICT_ERROR = 409;
const RegExp = {
  URL: /http(s)?:\/\/(w{3}.)?[a-z0-9.-]+\/[a-z0-9.\-_~:/?#[\]@!$&'()*+,;=]?#?/i
};
const { NODE_ENV, JWT_SECRET } = process.env;
const { PORT = 3000 } = process.env;
const DATABASE = process.env.DATABASE || 'mongodb://127.0.0.1:27017/bitfilmsdb';
module.exports = {
  OK_CODE,
  CREATE_CODE,
  BAD_REQUEST,
  NOT_FOUND,
  ERROR_CODE,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  CONFLICT_ERROR,
  RegExp,
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DATABASE,
};
