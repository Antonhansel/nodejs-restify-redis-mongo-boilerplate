'use strict';

require('should');
var create = require('create-dataset');
var request = require('supertest');
var async = require('async');

var common = require('../../../common');
var server = require('../../../../app');

describe('Get an existing user', function() {
  var userAgent;
  var sessionId;

  before(common.wipeMongo);

  before(function initUserAgent() {
    userAgent = request.agent(server);
  });

  var dataset = {};
  var rawDataset = {
    user: {
      email: 'yolo@edenbeat.fm',
      password: 'thepassword'
    },
    user1: {
      username: 'test'
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
        .end(function(err, res) {
          res.body.username.should.eql(dataset.user.username);
          done();
        });
    });

    it('should retrieve another user informations using username', function(done) {
      userAgent
        .get('/user/' + dataset.user1.username)
        .set('Session-id', sessionId)
        .expect(200)
        .end(function(err, res) {
          res.body.username.should.eql(dataset.user1.username);
          done();
        });
    });

    it('should retrieve another user informations using id', function(done) {
      userAgent
        .get('/user/' + dataset.user1._id)
        .set('Session-id', sessionId)
        .expect(200)
        .end(function(err, res) {
          res.body.id.should.eql(dataset.user1.id);
          console.log(res.body);
          done();
        });
    });
  });
});
