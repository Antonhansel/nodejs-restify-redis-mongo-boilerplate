'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passwordManager = require('../../helpers/password-manager');

/*
 * Schema
 */
var UserSchema = new Schema({
  /* username */
  username: {
    type: String,
    required: true,
    unique: true,
  },
  /* email */
  email: {
    type: String,
    required: true,
    unique: true,
  },
  creation_date: {
    type: Date,
    default: Date.now
  },
  /* password */
  password: {
    type: String
  }
});

// Hooks
UserSchema.pre('save', function(next) {
  var self = this;
  passwordManager.encryptPassword(self.password, function(err, newPassword) {
    if(err) {
      return next(err);
    }
    self.password = newPassword;
    next();
  });
});

module.exports = UserSchema;
