'use strict';

/** Setup test suite **/

var config = require('../config');
var common = require('./common');
var rarity = require('rarity');
var factory = require('factory-lady');
var create = require('create-dataset');

// Let's not wipe useful a database
if(config.mongoUrl.indexOf("localhost") === -1) {
  throw new Error("You're running the test suite on a distant Mongo DB (maybe prod?). This would wipe all collections. Exiting without running test suite, unset MONGO_URL to use default values.");
}

// Clean MongoDB
before(common.wipeMongo);

// Set create-dataset config
// see https://github.com/AnyFetch/create-dataset/blame/master/lib/index.js
before(function() {
  create.config = {
    user: {
      generator: function(data, cb) {
        factory.create('user', data, rarity.pad([null], cb));
      }
    },
  };
});
