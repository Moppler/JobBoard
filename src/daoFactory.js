const jobDao = require('./daos/job');

module.exports = {
  job: new jobDao(),
};
