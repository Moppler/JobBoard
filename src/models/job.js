/**
 * @typedef {import('../modelFactory')} ModelFactory
 * @typedef {import('../daoFactory')} DaoFactory
 *
 * @typedef {import('../daos/job').JobData} JobData
 */

class JobModel {
  /**
   * Creates a new instance of JobModel.
   *
   * @param {ModelFactory} ModelFactory
   * @param {DaoFactory} DaoFactory
   * @param {JobData} jobData
   */
  constructor(ModelFactory, DaoFactory, jobData) {
    /** @type {ModelFactory} */
    this.ModelFactory = ModelFactory;

    /** @type {DaoFactory} */
    this.DaoFactory = DaoFactory;

    /** @type {number} */
    this.id = jobData.id;

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

    /** @type {string} */
    this.description = jobData.description;

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

    return jobsData.map(
      (jobData) => new JobModel(ModelFactory, DaoFactory, jobData)
    );
  }

  /**
   * Fetches a specific job based on the supplied job itentifier and returns an
   * instance of the JobModel. If the job does not exist, null is returned.
   *
   * @param {ModelFactory} ModelFactory - Instance of
   * @param {DaoFactory} DaoFactory - Instance of
   * @param {number} jobId - Identifier of the desired job record.
   * @returns {Promise<JobModel|null>} Instance of JobModel. Null on error.
   */
  static async fetchById(ModelFactory, DaoFactory, jobId) {
    const jobData = await DaoFactory.job.fetchJobById(jobId);
    if (!jobData) return null;

    return new JobModel(ModelFactory, DaoFactory, jobData);
  }

  /**
   * Creates a new job based on the supplied job details, it then returns a new
   * instance of the Jobodel for that newly created job.
   *
   * @param {ModelFactory} ModelFactory - Instance of
   * @param {DaoFactory} DaoFactory - Instance of
   * @param {JobData} jobDetails - Details of the job to be created
   * @returns {Promise<JobModel|null>}
   */
  static async createJob(ModelFactory, DaoFactory, jobDetails) {
    const jobData = await DaoFactory.job.createJob(jobDetails);
    if (!jobData) return null;

    return new JobModel(ModelFactory, DaoFactory, jobData);
  }

  /**
   * Fetches a specific job based on the supplied job itentifier and returns an
   * instance of the JobModel. If the job does not exist, null is returned.
   *
   * @param {ModelFactory} ModelFactory - Instance of
   * @param {DaoFactory} DaoFactory - Instance of
   * @param {number} jobId - Identifier of the desired job record.
   * @param {JobData} jobDetails - Details of the job to be updated.
   * @returns {Promise<JobModel|null>} Instance of JobModel. Null on error.
   */
  static async updateJob(ModelFactory, DaoFactory, jobId, jobDetails) {
    const jobData = await DaoFactory.job.updateJob(jobId, jobDetails);
    if (!jobData) return null;

    return new JobModel(ModelFactory, DaoFactory, jobData);
  }
}

module.exports = JobModel;
