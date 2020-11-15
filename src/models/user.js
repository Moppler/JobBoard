/**
 * @typedef {import('../modelFactory')} ModelFactory
 * @typedef {import('../daoFactory')} DaoFactory
 *
 * @typedef {import('../daos/user').UserData} UserData
 */

class UserModel {
  /**
   * Creates a new instance of the UserModel.
   *
   * @param {ModelFactory} ModelFactory
   * @param {DaoFactory} DaoFactory
   * @param {UserData} userData
   */
  constructor(ModelFactory, DaoFactory, userData) {
    /** @type {ModelFactory} */
    this.ModelFactory = ModelFactory;

    /** @type {DaoFactory} */
    this.DaoFactory = DaoFactory;

    /** @type {number} */
    this.id = userData.id;
  }
}

module.exports = UserModel;
