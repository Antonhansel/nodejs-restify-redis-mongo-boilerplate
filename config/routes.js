'use strict';

var requireLogin = require('../lib/').middlewares.requireLogin;

// Routes client requests to handlers
module.exports = function(server, handlers) {
  // For the server status
  server.get('/status', handlers.status.get);
  // Login/Logout a user
  server.post('/login', handlers.login.post);
  server.get('/logout', requireLogin, handlers.logout.get);
  // The first enpoint called by client, to check if they are authenticated
  server.put('/user/self', requireLogin, handlers.user.self.index.put);
  // To get another user public profile
  server.get('/user/:usernameOrId', requireLogin, handlers.user.usernameorid.index.get);
  // Users
  server.post('/user', handlers.user.index.post);
  // OPTIONS request (for CORS)
  // server.opts(/\.*/, handlers.cors);
};
