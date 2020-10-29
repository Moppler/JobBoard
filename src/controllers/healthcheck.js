const config = require('../../config/environment')

module.exports = {
  fetchHealthcheck(req, res) {
    res.send({ version: config.version });
  }
};