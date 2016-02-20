'use strict';

/**
 * @file Define user factories
 *
 * This factory eases the creation of Mock user.
 */
var mongoose = require('mongoose');
var factory = require('factory-lady');
require('../../app');
var User = mongoose.model('User');

var uniqueId = 0;
var uniqueMail = 0;

factory.define('user', User, {
  username: function(cb) {
    cb('armstrong' + (uniqueId += 1));
  },
  email: function(cb) {
    cb('neil' + (uniqueMail += 1) + '@example.com');
  },
  password: 'pwdpwdpwd'
});
