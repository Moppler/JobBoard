const JobStore = require('./stores/job');

class StoreFactory {
  constructor(knexInstance) {
    this.job = new JobStore(knexInstance);
  }
}

module.exports = StoreFactory;
