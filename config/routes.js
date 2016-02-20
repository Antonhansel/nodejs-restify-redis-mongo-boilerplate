'use strict';

var requireLogin = require('../lib/').middlewares.requireLogin;

// Routes client requests to handlers
module.exports = function(server, handlers) {
  // Login/Logout a user
  server.post('/login', handlers.login.post);
  server.get('/logout', requireLogin, handlers.logout.get);
  // For the server status
  server.get('/status', handlers.status.get);
  // The first enpoint called by client, to check if they are authenticated
  server.get('/user/self', requireLogin, handlers.user.self.index.get);
  // Users
  server.post('/user', handlers.user.index.post);
  // OPTIONS request (for CORS)
  // server.opts(/\.*/, handlers.cors);
};
