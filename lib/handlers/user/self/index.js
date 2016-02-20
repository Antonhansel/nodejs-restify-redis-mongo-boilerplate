'use strict';

var async = require('async');
var mongoose = require('mongoose');
var restify = require('restify');

var User = mongoose.model('User');

module.exports.get = function getCurrentUser(req, res, next) {
  async.waterfall([
    function getUser(cb) {
      User.findOne({_id: req.session._id}, cb);
    }], function(err, user) {
      if(err) {
        return next(new restify.InternalServerError('An error as occured'));
      }
      else {
        delete user.password;
        delete user._id;
        res.send(user);
        next();
      }
    });
};
