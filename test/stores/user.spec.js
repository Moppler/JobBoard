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
});
