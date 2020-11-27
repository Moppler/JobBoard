const pkg = require('../package.json');
const env = process.env.NODE_ENV;

/**
 * @typedef {object} JWTConfig
 * @property {string} secret
 * @property {string} expiresIn
 */

const APP = {
  /** @type {string} Current application version */
  version: pkg.version,

  /** @type {number} Port the server should listen on */
  port: 3100,

  database: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
  },

  /** @type {JWTConfig} */
  JWT: {
    secret: 'THIS IS A SECRET STRING', // In Prod, use a key
    expiresIn: '8h', // 8 hours
  },
};

if (env === 'production') {
  // This is changed in production as the server it runs on already has a
  // service using 3100. Consider changing to environment variable.
  APP.port = 3200;
}

module.exports = APP;
