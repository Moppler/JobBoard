/**
 * @typedef {import('knex')} knex
 */

/**
 * @typedef {object} UserRow
 * @property {number} [id] - Optional for new rows
 * @property {string} email
 */

class UserStore {
  /**
   * @param {knex} db
   */
  constructor(db) {
    this._db = db;
  }

  // /**
  //  * Fetches all jobs from the store.
  //  *
  //  * @returns {Promise<JobRow[]>}
  //  */
  // async fetchAllJobs() {
  //   try {
  //     return this._db('jobs').select();
  //   } catch (e) {
  //     return null;
  //   }
  // }
}

module.exports = UserStore;
