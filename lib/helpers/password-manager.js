'use strict';

var config = require('../../config');
var crypto = require('crypto');

module.exports.encryptPassword = function encryptPasswords(password, callback) {
  crypto.pbkdf2(password, config.salt, 4096, 128, function(err, password) {
    if(err) {
      callback(err);
    }
    else {
      callback(null, password.toString('hex'));
    }
  });
};
