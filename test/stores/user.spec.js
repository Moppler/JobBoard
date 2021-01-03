const assert = require('chai').assert;
const sinon = require('sinon');

const UserStore = require('../../src/stores/user');

describe('Store: User', function () {
  describe('constructor', function () {
    it('correctly creates an instance of the store', function () {
      const mockDb = sinon.stub();
      const store = new UserStore(mockDb);

      assert.strictEqual(
        store._db,
        mockDb,
        'DB instances is correctly assigned to _db key'
      );
    });
  });
  describe('fetchByEmail', function () {
    it('catches exceptions from the DB and returns null', async function () {
      const mockKnex = sinon.stub().throwsException();
      const store = new UserStore(mockKnex);

      const result = await store.fetchByEmail('');

      assert.equal(result, null);
    });
    it('calls the database correctly', async function () {
      const whereStub = sinon.stub().returns('ROWSHERE');
      const mockKnex = sinon.stub().returns({
        first: sinon.stub().returns({
          where: whereStub,
        }),
      });
      const store = new UserStore(mockKnex);

      const result = await store.fetchByEmail('EMAILADDRESS');

      assert.equal(
        mockKnex.getCall(0).args[0],
        'users',
        'Correct table is called'
      );

      assert.equal(whereStub.getCall(0).args[0], 'email');
      assert.equal(whereStub.getCall(0).args[1], 'EMAILADDRESS');

      assert.equal(result, 'ROWSHERE');
    });
  });
  describe('fetchById', function () {
    it('catches exceptions from the DB and returns null', async function () {
      const mockKnex = sinon.stub().throwsException();
      const store = new UserStore(mockKnex);

      const result = await store.fetchById('');

      assert.equal(result, null);
    });
    it('calls the database correctly', async function () {
      const whereStub = sinon.stub().returns('ROWSHERE');
      const mockKnex = sinon.stub().returns({
        first: sinon.stub().returns({
          where: whereStub,
        }),
      });
      const store = new UserStore(mockKnex);

      const result = await store.fetchById('ID');

      assert.equal(
        mockKnex.getCall(0).args[0],
        'users',
        'Correct table is called'
      );

      assert.equal(whereStub.getCall(0).args[0], 'id');
      assert.equal(whereStub.getCall(0).args[1], 'ID');

      assert.equal(result, 'ROWSHERE');
    });
  });
});
