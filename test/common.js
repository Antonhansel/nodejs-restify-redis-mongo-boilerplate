/**
 * Load test environment
 */


var path = require('path');
var mochaMongoose = require('mocha-mongoose');

var config = require(path.join(__dirname, '..') + '/config');


exports.wipeMongo = mochaMongoose(config.mongoUrl, {
  noClear: true
});
