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
        res.send(user.toJson());
        next();
      }
    });
};

module.exports.put = function getCurrentUser(req, res, next) {
  async.waterfall([
    function getUser(cb) {
      User.findOne({_id: req.session._id}, cb);
    }], function(err, user) {
      if(err) {
        return next(new restify.InternalServerError('An error as occured'));
      }
      else {
        if(req.params.password) {
          if(req.params.password.length < 8) {
            return next(new restify.InvalidArgumentError('Password should be at least 8 characters long.'));
          }
          user.password = req.params.password;
        }
        if(req.params.username) {
          if(req.params.username.length < 6) {
            return next(new restify.InvalidArgumentError('Username should be at least 6 characters long.'));
          }
          user.username = req.params.username;
        }
        user.save(function(err) {
          if(err) {
            return next(new restify.InternalServerError('An error as occured'));
          }
          res.send(200);
          next();
        });
      }
    });
};
