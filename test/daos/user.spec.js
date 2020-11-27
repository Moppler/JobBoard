const assert = require('chai').assert;
const sinon = require('sinon');

const UserDao = require('../../src/daos/user');

describe('Dao: User', function () {
  describe('_JobRowtoJobData', function () {
    it('correctly maps a JobRow to JobData', function () {
      const dao = new UserDao();

      const userRow = {
        id: 1,
        email: '2',
        password_hash: '3',
      };

      const userData = dao._UserRowtoUserData(userRow);

      assert.strictEqual(userData.id, 1);
      assert.strictEqual(userData.email, '2');
      assert.strictEqual(userData.passwordHash, '3');
    });
  });
  describe('fetchByEmail', function () {
    it('returns null when the store returns null', async function () {
      const mockUserStore = {
        fetchByEmail: sinon.stub().resolves(null),
      };
      const dao = new UserDao(mockUserStore);

      const result = await dao.fetchByEmail('');

      assert.equal(result, null);
    });
    it('returns a call to the mapper function with the store data', async function () {
      const mockStoreResponse = sinon.stub();
      const mockUserStore = {
        fetchByEmail: sinon.stub().resolves(mockStoreResponse),
      };
      const dao = new UserDao(mockUserStore);

      const mapperStub = sinon
        .stub(dao, '_UserRowtoUserData').returns('RESPONSE');

      const result = await dao.fetchByEmail('');

      assert.equal(result, 'RESPONSE');
      assert.equal(mapperStub.getCall(0).args[0], mockStoreResponse);
    });
  });
});
