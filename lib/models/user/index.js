'use strict';

var mongoose = require('mongoose');
var UserSchema = require('./schema');

UserSchema.methods = require('./methods');
module.exports = mongoose.model('User', UserSchema);
