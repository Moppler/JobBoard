/**
 * @typedef {import('../stores/job')} JobStore
 */

class JobDao {
  /**
   * @param {JobStore} JobStore - Instance of
   */
  constructor(JobStore) {
    this.JobStore = JobStore;
  }

  async fetchAllJobs() {
    return await this.JobStore.fetchAllJobs();
  }

  /**
   * Returns a job that matches the specified Id.
   *
   * @param {number} jobId
   */
  async fetchJobById(jobId) {
    return await this.JobStore.fetchJobById(jobId);
  }
}

module.exports = JobDao;
