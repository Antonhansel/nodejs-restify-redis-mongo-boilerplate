'use strict';

var mongoose = require('mongoose');
var UserSchema = require('./schema');

module.exports = mongoose.model('User', UserSchema);
