const pkg = require('../package.json');

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

module.exports = APP;
