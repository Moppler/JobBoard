const package = require('../package.json');

const APP = {
  /** @type {string} Current application version */
  version: package.version,

  /** @type {number} Port the server should listen on */
  port: 3100
};

module.exports = APP;