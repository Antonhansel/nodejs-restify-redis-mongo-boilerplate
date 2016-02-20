'use strict';

module.exports = function(req, res, next) {
  var allowHeaders = ['Accept', 'Accept-Version', 'Authorization', 'Content-Type', 'X-Requested-With'];

  res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  // Vary per origin, if headerS.origin is unset the cookie will not exist
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Vary', 'Origin');

  return next();
};
