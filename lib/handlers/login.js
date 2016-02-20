'use strict';

var async = require('async');
var passwordManager = require('../helpers/password-manager');
var User = require('../models/user/index');
var restify = require('restify');


module.exports.post = function login(req, res, next) {
  var foundUser;
  async.waterfall([
    function checkArguments(cb) {
      if(!req.params || !req.params.email || !req.params.password) {
        return cb(new restify.InvalidArgumentError('Missing parameter.'));
      }
      cb(null);
    }, function findUser(cb) {
      User.findOne({email: req.params.email}, cb);
    }, function saveUser(user, cb) {
      foundUser = user;
      passwordManager.encryptPassword(req.params.password, cb);
    }, function checkPassword(encrypted, cb) {
      if(foundUser.password === encrypted) {
        return req.session.save(req.session.sid, {_id: foundUser._id, username: foundUser.username}, cb);
      }
      return cb(new restify.InvalidArgumentError('Wrong password'));
    }
  ], function(err) {
    if(err) {
      next(err);
    }
    else {
      res.send(200);
    }
  });
};
