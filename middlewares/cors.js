const allowedCors = [
  'http://localhost:3001',
  'localhost:3001',
  'http://localhost:3000',
  'localhost:3000',
  'https://api.veronikagg-diploma.nomoredomains.rocks',
  'http://api.veronikagg-diploma.nomoredomains.rocks',
  'https://veronikagg-diploma.nomoredomains.rocks',
  'http://veronikagg-diploma.nomoredomains.rocks',
  '//veronikagg-diploma.nomoredomains.rocks',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};

module.exports = cors;
