/**
 * @typedef {import('knex')} knex
 */

/**
 * @typedef {object} JobRow
 * @property {number} id
 * @property {string} title
 * @property {string} location
 * @property {string} salary
 * @property {string} jobType
 * @property {string} summary
 * @property {string} description
 * @property {string} datePosted - SQL datetime
 * @property {string} created_time - SQL datetime
 * @property {string} updated_time - SQL datetime
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
}

module.exports = JobStore;
