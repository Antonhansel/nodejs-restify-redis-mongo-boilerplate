'use strict';

module.exports.get = function get(req, res, next) {
  res.send(200, {
    status: 'ok',
  });
  next();
};
