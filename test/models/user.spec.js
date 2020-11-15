const assert = require('chai').assert;
const sinon = require('sinon');

const UserModel = require('../../src/models/user');

describe('Model: User', function () {
  describe('constructor', function () {
    it('Has all the expected keys', function () {
      const mockModelFactory = sinon.stub();
      const mockDaoFactory = sinon.stub();
      const user = new UserModel(mockModelFactory, mockDaoFactory, {});

      assert.deepStrictEqual(
        Object.keys(user),
        ['ModelFactory', 'DaoFactory', 'id'],
        ''
      );
    });
  });
});
