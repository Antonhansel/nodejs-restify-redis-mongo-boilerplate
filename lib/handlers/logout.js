'use strict';

module.exports.get = function logout(req, res, next) {
  req.session.destroy(req.session.sid, function() {
    res.send(200);
    next();
  });
};
