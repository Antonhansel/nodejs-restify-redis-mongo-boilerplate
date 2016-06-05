'use strict';

var async = require('async');
var restify = require('restify');
var config = require('../../config/index.js');
var knox = require('knox');
var fs = require('fs');

var baseS3Path = '/uploads/' + config.env + '/';

var credentials = {
  secure: true,
  bucket: config.aws.bucket,
  key: config.aws.id,
  secret: config.aws.secret};

var connect = function() {
  return knox.createClient(credentials);
};

var removeTempFile = function(path, callback) {
  fs.unlink(path, function(err) {
    if (typeof callback === 'function') {
      process.nextTick(function() {
        callback(err);
      });
    }
  });
};

// takes in parameter the file to upload, return the url where it was uploaded
module.exports = function uploadToS3(path, s3Filename, cb) {
  var client = connect();
  var url;

  async.waterfall([
    function startUpload(cb) {
      client.putFile(path, baseS3Path + s3Filename, {'x-amz-acl': 'public-read'}, cb);
    },
    function removeTemp(result, cb) {
      url = result.req.url;
      removeTempFile(path, cb);
    }], function(err) {
    cb(null, url);
  });
}
