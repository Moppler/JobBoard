/**
 * @typedef {import('knex')} knex
 * @typedef {import('../daos/job').JobData} JobData
 */

/**
 * Date columns are automatically converted to JS Date objects by the
 * node-postgres library:
 * https://node-postgres.com/features/types#date-timestamp-timestamptz
 *
 * @typedef {object} JobRow
 * @property {number} [id] - Optional for new rows
 * @property {string} title
 * @property {string} location
 * @property {string} salary
 * @property {string} job_type
 * @property {string} summary
 * @property {string} description
 * @property {Date} date_posted - SQL datetime
 * @property {Date} [created_time] - SQL datetime, Optional for new rows
 * @property {Date} [updated_time] - SQL datetime, Optional for new rows
 */

class JobStore {
  /**
   * @param {knex} db
   */
  constructor(db) {
    this._db = db;
  }
  /**
   * Fetches all jobs from the store.
   *
   * @returns {Promise<JobRow[]>}
   */
  async fetchAllJobs() {
    try {
      return this._db('jobs').select();
    } catch (e) {
      return null;
    }
  }

  /**
   * Returns a job that matches the specified Id.
   *
   * @param {number} jobId
   * @returns {Promise<JobRow>}
   */
  async fetchJobById(jobId) {
    try {
      return this._db('jobs').first().where('id', jobId);
    } catch (e) {
      return null;
    }
  }

  /**
   * Inserts a new job into the databse and then returns the newly created row.
   *
   * @param {JobRow} newRow - detsils to be inserted into the DB
   * @returns {Promise<JobRow>}
   */
  async createJob(newRow) {
    try {
      const rows = await this._db('jobs').insert(newRow).returning('*');
      return rows[0];
    } catch (e) {
      return null;
    }
  }

  /**
   * Returns a job that matches the specified Id.
   *
   * @param {number} jobId
   * @returns {Promise<JobRow>}
   */
  async updateJob(jobId, jobDetails) {
    try {
      const rows = await this._db('jobs')
        .where('id', jobId)
        .update(jobDetails)
        .returning('*');
      console.log(rows[0]);
      return rows[0];
    } catch (e) {
      return null;
    }
  }
}

module.exports = JobStore;
