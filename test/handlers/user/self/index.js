'use strict';

require('should');
var create = require('create-dataset');
var request = require('supertest');
var async = require('async');

var common = require('../../../common');
var server = require('../../../../app');

describe('/user', function() {
  var userAgent;
  var sessionId;

  before(common.wipeMongo);

  before(function initUserAgent() {
    userAgent = request.agent(server);
  });

  var dataset = {};
  var rawDataset = {
    user: {
      email: 'yolo@boilerplate.com',
      password: 'passwordislong'
    }
  };

  before(create.apply(rawDataset, dataset));

  describe('GET /user', function() {

    it('should login this user', function(done) {
      userAgent
        .post('/login')
        .send({
          email: dataset.user.email,
          password: rawDataset.user.password
        })
        .expect(200)
        .end(function(err, res) {
          sessionId = res.headers['session-id'];
          done(err);
        });
    });

    it('should retrieve this user informations', function(done) {
      userAgent
        .get('/user/self')
        .set('Session-id', sessionId)
        .expect(200)
        .end(done);
    });

    it('should send 403 when no session-Id is specified', function(done) {
      userAgent
        .get('/user/self')
        .expect(403)
        .end(done);
    });

    it('should not be able to get /user/self after logging out', function(done) {
      async.waterfall([
        function logOutUser(cb) {
          userAgent
            .get('/logout')
            .set('Session-id', sessionId)
            .expect(200)
            .end(cb);
        },
        function getUserSelf(res, cb) {
          userAgent
            .get('/user/self')
            .set('Session-id', sessionId)
            .expect(403)
            .end(cb);
        }], done);
    });
  });
});
