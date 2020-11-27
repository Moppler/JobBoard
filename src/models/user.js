const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * @typedef {import('../modelFactory')} ModelFactory
 * @typedef {import('../daoFactory')} DaoFactory
 *
 * @typedef {import('../daos/user').UserData} UserData
 * @typedef {import('../../config/environment').JWTConfig} JWTConfig
 */

/**
 * @typedef {object} JWTPayload
 * @property {number} userId
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

    /** @type {string} */
    this.email = userData.email;

    /**
     * We don't store the password enteresd by the user, we store a hash of that
     * password. This hash is never exposed and is therefore marked as a private
     * property of the JobModel.
     *
     * @private
     * @type {string}
     */
    this._passwordHash = userData.passwordHash;
  }

  /**
   * Compares a password string provided at an authentication challengs (like
   * the login form) with the hash stored against the user record.
   *
   * @param {string} password - Password provided at auth challenge
   * @returns {Promise<boolean>}
   */
  async validatePassword(password) {
    try {
      return await bcrypt.compare(password, this._passwordHash);
    } catch (error) {
      return false;
    }
  }

  /**
   * Creates a new JWT for this user. This is typically generated on login and
   * used to verify the user.
   *
   * @param {JWTConfig} JWTConfig
   * @returns {Promise<string>} JWT
   */
  async generateJWT(JWTConfig) {
    /** @type {JWTPayload} */
    const payload = {
      userId: this.id,
    };
    return await jwt.sign(payload, JWTConfig.secret, {
      expiresIn: JWTConfig.expiresIn,
      algorithm: 'HS256',
    });
  }

  /**
   * Fetches a user record that matches the specified email address. If the user
   * does not exist, null is returned.
   *
   * @param {ModelFactory} ModelFactory - Instance of
   * @param {DaoFactory} DaoFactory - Instance of
   * @param {string} emailAddress - email address of desired user
   * @returns {Promise<UserModel|null>}
   */
  static async fetchUserByEmail(ModelFactory, DaoFactory, emailAddress) {
    const userDetails = await DaoFactory.user.fetchByEmail(emailAddress);
    if (!userDetails) return null;

    return new UserModel(ModelFactory, DaoFactory, userDetails);
  }

  /**
   * Fetches a user record that matches the specified id. If the user does not
   * exist, null is returned.
   *
   * @param {ModelFactory} ModelFactory - Instance of
   * @param {DaoFactory} DaoFactory - Instance of
   * @param {number} userId - id of desired user
   * @returns {Promise<UserModel|null>}
   */
  static async fetchUserById(ModelFactory, DaoFactory, userId) {
    const userDetails = await DaoFactory.user.fetchById(userId);
    if (!userDetails) return null;

    return new UserModel(ModelFactory, DaoFactory, userDetails);
  }

  /**
   * Verifies that a JWT is valid and returns it's payload if it is.
   *
   * @param {string} JWTString - JWT from cookie
   * @param {JWTConfig} JWTConfig - JWT Config
   * @returns {Promise<JWTPayload>}
   */
  static async verifyJWT(JWTString, JWTConfig) {
    try {
      /** @type {object} */
      const decodedPayload = await jwt.verify(JWTString, JWTConfig.secret, {
        algorithms: ['HS256'],
      });
      return decodedPayload;
    } catch (e) {
      return null;
    }
  }
}

module.exports = UserModel;
