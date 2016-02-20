'use strict';

var autoload = require('auto-load');
// Ensure models get loaded first, since we often use mongoose.model()
autoload(__dirname + "/models");


module.exports = autoload(__dirname);
