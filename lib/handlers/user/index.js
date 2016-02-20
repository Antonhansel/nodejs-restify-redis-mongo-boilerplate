'use strict';

var async = require('async');
var mongoose = require('mongoose');
var restify = require('restify');

var User = mongoose.model('User');

var wrapError = function wrapError(err) {
  if(err.message.match(/username_1/i)) {
    return new restify.InvalidArgumentError('username is already taken');
  }
  else if(err.message.match(/email_1/i)) {
    return new restify.InvalidArgumentError('email is already taken');
  }
  else {
    return new restify.InternalServerError('An error has occured');
  }
};

module.exports.post = function post(req, res, next) {
  // check if user is already logged in
  if(req.session._id) {
    return next(new restify.InvalidArgumentError('Cannot create an account when you are already logged in'));
  }
  else {
    // body validation
    var validationError;
    if(req.params && req.params.password && req.params.password.length < 8) {
      validationError = new restify.InvalidArgumentError('Password should be at least 8 characters long.');
    }
    if(!req.params || !req.params.email || !req.params.username) {
      validationError = new restify.InvalidArgumentError('Missing parameter.');
    }
    if(validationError) {
      return next(validationError);
    }
    // User creation process
    var createdUser;
    async.waterfall([
      function createUser(cb) {
        User.create({
          username: req.params.username,
          email: req.params.email,
          password: req.params.password,
        }, cb);
      }, function saveUser(user, cb) {
        createdUser = user.username;
        req.session.save(req.session.sid, {_id: user._id, username: user.username}, cb);
      }
    ], function(err) {
      if(err) {
        return next(wrapError(err));
      }
      res.send({username: createdUser});
      next();
    });
  }
};
