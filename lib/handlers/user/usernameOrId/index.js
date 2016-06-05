'use strict';

var async = require('async');
var mongoose = require('mongoose');
var restify = require('restify');

var User = mongoose.model('User');

module.exports.get = function get(req, res, next) {
  async.waterfall([
    function findUser(cb) {
      if(mongoose.Types.ObjectId.isValid(req.params.usernameOrId)) {
          return User.findOne({_id: new mongoose.Types.ObjectId(req.params.usernameOrId)}, cb);
      }
      if(req.params.usernameOrId === 'self') {
        return User.findOne({_id: new mongoose.Types.ObjectId(req.session._id)}, cb);
      }
      return User.findOne({username: req.params.usernameOrId}, cb);
    },
    function sendData(user, cb) {
      if(!user) {
        return cb(new restify.ResourceNotFoundError("The user " + req.params.usernameOrId + " does not exist or is not available"));
      }
      if(user._id.toString() === req.session._id.toString()) {
        res.send(user.toJson());
      }
      else {
        res.send(user.toPublicJson());
      }
      cb();
    }
  ], next);
};
