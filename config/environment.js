const pkg = require('../package.json');
const env = process.env.NODE_ENV;

const APP = {
  /** @type {string} Current application version */
  version: pkg.version,

  /** @type {number} Port the server should listen on */
  port: 3100,

  database: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
  },
};

if (env === 'production') {
  // This is changed in production as the server it runs on already has a
  // service using 3100. Consider changing to environment variable.
  APP.port = 3200;
}

module.exports = APP;
