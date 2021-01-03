/**
 * @typedef {import('../stores/user')} UserStore
 * @typedef {import('../stores/user').UserRow} UserRow
 */

/**
 * @typedef {object} UserData
 * @property {number} [id] - Optional as new objects don't have one
 * @property {string} email
 * @property {string} passwordHash - Only the has of the password is stored.
 */

class UserDao {
  /**
   * @param {UserStore} UserStore - Instance of
   */
  constructor(UserStore) {
    this.UserStore = UserStore;
  }

  /**
   * Converts a UserRow object to a UserData object.
   *
   * @param {UserRow} userRow
   * @returns {UserData}
   */
  _UserRowtoUserData(userRow) {
    return {
      id: userRow.id,
      email: userRow.email,
      passwordHash: userRow.password_hash,
    };
  }

  /**
   * Fetches the data for a user with an email address matching the provided
   * one. If the user does not exist, null is returned.
   *
   * @param {string} emailAddress - email address of desired user record
   * @returns {Promise<UserData>}
   */
  async fetchByEmail(emailAddress) {
    const userData = await this.UserStore.fetchByEmail(emailAddress);
    if (!userData) return null;

    return this._UserRowtoUserData(userData);
  }

  /**
   * Fetches the data for a user with an id matching the provided one. If the
   * user does not exist, null is returned.
   *
   * @param {number} userId - id of desired user record
   * @returns {Promise<UserData>}
   */
  async fetchById(userId) {
    const userData = await this.UserStore.fetchById(userId);
    if (!userData) return null;

    return this._UserRowtoUserData(userData);
  }
}

module.exports = UserDao;
