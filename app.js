'use strict';

// Load configuration and initialize server
var _ = require('underscore');
var url = require('url');
var restify = require('restify');
var mongoose = require('mongoose');
var restifyBunyanLogger = require('restify-bunyan-logger');
var jsonFormatter = require('restify-json-filtering');

var config = require('./config');

// Redis client
var redisUrl = url.parse(config.session.url);
var redisCredentials = redisUrl.auth.split(':');

var redisConfig = {
  ttl: 3600000,
  debug: process.env.NODE_ENV ? false : true,
  connection: {
    host: redisUrl.hostame,
    port: redisUrl.port,
    db: 0,
    pass: redisCredentials[1],
    user: redisCredentials[0]
  }
};

var session = require('restify-session')(redisConfig);

var lib = require("./lib/");
var handlers = lib.handlers;
var middlewares = lib.middlewares;

var server = restify.createServer({
  formatters: {
    'application/json': jsonFormatter('fields')
  }
});

// Connect to mongoose
mongoose.connect(config.mongoUrl);

// Inject middlewares into restify
server.use(restify.gzipResponse());
server.use(middlewares.cors);
server.use(session.sessionManager);
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Attach our session object to every requests
// Maybe we should change that later, bad performances?
server.use(function(req, res, next) {
  req.session = _.extend(req.session, session);
  next();
});

// Load routes
require("./config/routes")(server, handlers);

// Log errors
server.on('uncaughtException', function(req, res, route, err) {
  // TODO
  // We should pipe our errors in graylog here
  console.log(req.body, res.body, route, err);
  return false;
});

// last server config
server.on('after', restifyBunyanLogger({
  // Let's not show the calls on /status
  skip: function(req) {
    return req.url === "/status" || req.method === "OPTIONS";
  }
}));

// And we are done :)
// Expose the server
module.exports = server;
