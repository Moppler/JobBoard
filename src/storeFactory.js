const JobStore = require('./stores/job');
const UserStore = require('./stores/user');

class StoreFactory {
  constructor(knexInstance) {
    this.job = new JobStore(knexInstance);
    this.user = new UserStore(knexInstance);
  }
}

module.exports = StoreFactory;
