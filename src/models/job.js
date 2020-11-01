/**
 * @typedef {import('../modelFactory')} ModelFactory
 * @typedef {import('../daoFactory')} DaoFactory
 */

class JobModel {
  constructor(jobData) {
    /** @type {string} */
    this.title = jobData.title;

    /** @type {string} */
    this.location = jobData.location;

    /** @type {string} */
    this.salary = jobData.salary;

    /** @type {string} */
    this.jobType = jobData.jobType;

    /** @type {string} */
    this.summary = jobData.summary;

    /** @type {import('luxon').DateTime} */
    this.datePosted = jobData.datePosted;
  }

  /**
   * Fetches all jobs from the system and returns new instances of the JobModel
   * for each. When there are no jobs, it returns an empty array. On error, it
   * returns null.
   *
   * @param {ModelFactory} ModelFactory - instance of
   * @param {DaoFactory} DaoFactory - instance of
   * @returns {Promise<JobModel[]|null>} Array of JobModel Objects. Null on error.
   */
  static async fetchAllJobs(ModelFactory, DaoFactory) {
    const jobsData = await DaoFactory.job.fetchAllJobs();
    if (!jobsData) return null;

    return jobsData.map((jobData) => new JobModel(jobData));
  }
}

module.exports = JobModel;
