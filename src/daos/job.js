/**
 * @typedef {import('../stores/job')} JobStore
 * @typedef {import('../stores/job').JobRow} JobRow
 */

/**
 * @typedef {object} JobData
 * @property {number} [id] - Optional as new objects don't have one
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
      jobType: jobRow.job_type,
      summary: jobRow.summary,
      description: jobRow.description,
      datePosted: DateTime.fromJSDate(jobRow.date_posted),
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

  /**
   * Creates a new job with the provided details and returns the newly created
   * job.
   *
   * @param {JobData} jobPayload - Details of the new job
   * @returns {Promise<JobData>}
   */
  async createJob(jobPayload) {
    const jobRow = await this.JobStore.createJob({
      title: jobPayload.title,
      location: jobPayload.location,
      salary: jobPayload.salary,
      job_type: jobPayload.jobType,
      summary: jobPayload.summary,
      description: jobPayload.description,
      date_posted: jobPayload.datePosted.toJSDate(),
    });
    return this._JobRowtoJobData(jobRow);
  }
}

module.exports = JobDao;
