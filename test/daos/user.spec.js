const assert = require('chai').assert;

const UserDao = require('../../src/daos/user');

describe('Dao: User', function () {
  describe('_JobRowtoJobData', function () {
    it('correctly maps a JobRow to JobData', function () {
      const dao = new UserDao();

      const userRow = {
        id: 1,
        email: '2',
      };

      const userData = dao._UserRowtoUserData(userRow);

      assert.strictEqual(userData.id, 1);
      assert.strictEqual(userData.email, '2');
    });
  });
});
