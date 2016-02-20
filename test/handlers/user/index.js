'use strict';

require('should');
var mongoose = require("mongoose");
var request = require('supertest');
var rarity = require('rarity');
var async = require('async');

var common = require('../../common');
var server = require('../../../app');


describe('/user', function() {
  var userAgent;
  var sessionId;

  before(common.wipeMongo);

  before(function initUserAgent() {
    userAgent = request.agent(server);
  });

  describe("POST /user", function() {
    it('should add user', function(done) {
      async.waterfall([
        function postUser(cb) {
          var user = {
            email: 'test@yopmail.com',
            username: 'test',
            password: 'testtest'
          };
          userAgent
            .post('/user')
            .send(user)
            .expect(200)
            .end(cb);
        },
        function getUser(res, cb) {
          mongoose.model('User').count({
            username: res.body.username
          }, rarity.carry([res], cb));
        },
        function checkValid(res, count, cb) {
          sessionId = res.header['session-id'];
          count.should.eql(1);
          cb();
        }
      ], done);
    });

    it('should return error if fields are missing', function(done) {
      userAgent
        .post('/user')
        .expect(409)
        .expect(/Missing parameter/i)
        .end(done);
    });

    it('should return an error if we try to create a user when already logged in', function(done) {
      userAgent
        .post('/user')
        .set('Session-id', sessionId)
        .expect(409)
        .expect(/already logged in/i)
        .end(done);
    });

    it('should return error if password is too short', function(done) {
      var user = {
        email: 'test@yopmail.com',
        username: 'test',
        password: 'short'
      };

      userAgent
        .post('/user')
        .send(user)
        .expect(409)
        .expect(/at least 8 characters long/i)
        .end(done);
    });

    it('should return error if username is already taken', function(done) {
      var user = {
        email: 'test2@yopmail.com',
        username: 'test',
        firstname: 'test',
        lastname: 'touille',
        password: 'testtest'
      };

      userAgent
        .post('/user')
        .send(user)
        .expect(409)
        .expect(/username is already taken/i)
        .end(done);
    });

    it('should return error if mail is already taken', function(done) {
      var user = {
        email: 'test@yopmail.com',
        username: 'test2',
        firstname: 'test',
        lastname: 'touille',
        password: 'testtest'
      };

      userAgent
        .post('/user')
        .send(user)
        .expect(409)
        .expect(/email is already taken/i)
        .end(done);
    });
  });
});
