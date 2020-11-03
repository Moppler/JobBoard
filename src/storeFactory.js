const JobStore = require('./stores/job');

class StoreFactory {
  constructor() {
    this.job = new JobStore();
  }
}

module.exports = StoreFactory;
