/**
 * @typedef {import('../stores/user')} UserStore
 * @typedef {import('../stores/user').UserRow} UserRow
 */

/**
 * @typedef {object} UserData
 * @property {number} [id] - Optional as new objects don't have one
 * @property {string} email
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
    };
  }
}

module.exports = UserDao;
