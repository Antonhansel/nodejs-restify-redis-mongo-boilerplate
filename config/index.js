'use strict';

// node_env can either be "development", "production" or "test"
var nodeEnv = process.env.NODE_ENV || "development";

// Port to run the app on. 8000 for development
// 80 for production
var defaultPort = 8000;
if(nodeEnv === "production") {
  defaultPort = 80;
}

var port = process.env.PORT || defaultPort;

// MongoDB configuration
var mongo = process.env.MONGOURL || ("mongodb://localhost/" + nodeEnv);

// Exports configuration for use by app.js
module.exports = {
  // Name for the current instance (api, api-staging)
  appName: process.env.APP_NAME || 'api',
  // Node environment.
  env: nodeEnv,
  // Current API url (used to build callback url for hydraters)
  apiUrl: process.env.API_URL || 'http://0.0.0.0:' + port,
  // Port to listen on
  port: port,
  // URL for mongo access
  mongoUrl: mongo,
  // Session
  session: {
    url: process.env.REDISCLOUD_URL || 'redis://yourredisserver-sessions@localhost:6379',
    ttl: process.env.SESSION_TTL || 1209600,
  },
  salt: process.env.SALT || "thisIsYourSalt",
  aws: {
    bucket: process.env.S3_BUCKET || 'bucket',
    id: process.env.S3_ID || 'bucketID',
    secret: process.env.S3_SECRET || 'bucketSecret'
  }
};
