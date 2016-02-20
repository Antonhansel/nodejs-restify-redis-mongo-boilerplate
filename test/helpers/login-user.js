'use strict';

/**
 * Authenticate the user
 */

module.exports = function(userAgent, user, cb) {
  // let's login the user, using the default password
  userAgent.post('/login')
    .send({username: user.mail, password: 'pwdpwd'})
    .expect(302)
    .end(cb);
};
