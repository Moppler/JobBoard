/**
 * @typedef {import('../modelFactory')} ModelFactory
 * @typedef {import('../daoFactory')} DaoFactory
 */

class JobModel {
  constructor(jobData) {
    this.title = jobData.title;
    this.location = jobData.location;
    this.salary = jobData.salary;
    this.jobType = jobData.jobType;
    this.summary = jobData.summary;
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
