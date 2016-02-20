'use strict';

var async = require('async');
var mongoose = require('mongoose');
var restify = require('restify');

var User = mongoose.model('User');

module.exports.get = function get(req, res, next) {
  async.waterfall([
    function findUser(cb) {
      User.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, cb);
    },
    function sendData(user, cb) {
      if(!user) {
        return cb(new restify.ResourceNotFoundError("The user " + req.params.id + " does not exist or is not available"));
      }
      res.send(user.toJson());
      cb();
    }
  ], next);
};
