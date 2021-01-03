/**
 * @typedef {import('knex')} knex
 */

/**
 * @typedef {object} UserRow
 * @property {number} [id] - Optional for new rows
 * @property {string} email
 * @property {string} password_hash - Only the has of the password is stored.
 * @property {Date} [created_time] - SQL datetime, Optional for new rows
 * @property {Date} [updated_time] - SQL datetime, Optional for new rows
 */

class UserStore {
  /**
   * @param {knex} db
   */
  constructor(db) {
    this._db = db;
  }

  /**
   * Fetches a user record with an email address that matches the provided one.
   *
   * @param {string} emailAddress - email address of desired user record
   * @returns {Promise<UserRow>}
   */
  async fetchByEmail(emailAddress) {
    try {
      return this._db('users').first().where('email', emailAddress);
    } catch (e) {
      return null;
    }
  }

  /**
   * Fetches a user record with an id that matches the provided one.
   *
   * @param {number} userId - id of desired user record
   * @returns {Promise<UserRow>}
   */
  async fetchById(userId) {
    try {
      return this._db('users').first().where('id', userId);
    } catch (e) {
      return null;
    }
  }
}

module.exports = UserStore;
