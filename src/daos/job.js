/**
 * @typedef {import('../stores/job')} JobStore
 * @typedef {import('../stores/job').JobRow} JobRow
 */

/**
 * @typedef {object} JobData
 * @property {number} id
 * @property {string} title
 * @property {string} location
 * @property {string} salary
 * @property {string} jobType
 * @property {string} summary
 * @property {string} description
 * @property {DateTime} datePosted
 */

const { DateTime } = require('luxon');

class JobDao {
  /**
   * @param {JobStore} JobStore - Instance of
   */
  constructor(JobStore) {
    this.JobStore = JobStore;
  }

  /**
   * Converts a JobRow object to a JobData object.
   *
   * @param {JobRow} jobRow
   * @returns {JobData}
   */
  _JobRowtoJobData(jobRow) {
    return {
      id: jobRow.id,
      title: jobRow.title,
      location: jobRow.location,
      salary: jobRow.salary,
      jobType: jobRow.jobType,
      summary: jobRow.summary,
      description: jobRow.description,
      datePosted: DateTime.fromSQL(jobRow.datePosted),
    };
  }

  /**
   * Fetches all jobs from the store and returns an array of JobData objects.
   *
   * @returns {Promise<JobData[]>}
   */
  async fetchAllJobs() {
    const jobRows = await this.JobStore.fetchAllJobs();
    return jobRows.map((row) => this._JobRowtoJobData(row));
  }

  /**
   * Returns a job that matches the specified Id.
   *
   * @param {number} jobId
   * @returns {Promise<JobData>}
   */
  async fetchJobById(jobId) {
    const jobRow = await this.JobStore.fetchJobById(jobId);
    return this._JobRowtoJobData(jobRow);
  }
}

module.exports = JobDao;
