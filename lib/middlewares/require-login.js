'use strict';
/**
 *
 * Will check if a previous auth middleware logged the user,
 * Or return with an error message.
 */

var restify = require('restify');

module.exports = function requireLogin(req, res, next) {
  if(req.session._id) {
    next();
  }
  else {
    next(new restify.errors.NotAuthorizedError("You are not authorized to access this ressource"));
  }
};
