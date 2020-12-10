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
        ['ModelFactory', 'DaoFactory', 'id', 'email', '_passwordHash'],
        ''
      );
    });
  });
  describe('Static Functions', function () {
    describe('fetchUserByEmail', function () {
      it('returns null when the dao doesnt return a user', async function () {
        const mockFetchByEmail = sinon.stub().resolves(null);

        const mockModelFactory = {};
        const mockDaoFactory = {
          user: {
            fetchByEmail: mockFetchByEmail,
          },
        };
        const fetchedUser = await UserModel.fetchUserByEmail(
          mockModelFactory,
          mockDaoFactory,
          ''
        );

        assert.equal(fetchedUser, null);
      });
      it('returns returns a new instance of the UserModel', async function () {
        const mockFetchByEmail = sinon.stub().resolves({});

        const mockModelFactory = {};
        const mockDaoFactory = {
          user: {
            fetchByEmail: mockFetchByEmail,
          },
        };
        const fetchedUser = await UserModel.fetchUserByEmail(
          mockModelFactory,
          mockDaoFactory,
          ''
        );

        assert.instanceOf(fetchedUser, UserModel);
        assert.deepEqual(fetchedUser.ModelFactory, mockModelFactory);
        assert.deepEqual(fetchedUser.DaoFactory, mockDaoFactory);
      });
    });
    describe('fetchUserById', function () {
      it('returns null when the dao doesnt return a user', async function () {
        const mockModelFactory = {};
        const mockDaoFactory = {
          user: {
            fetchById: sinon.stub().resolves(null),
          },
        };
        const fetchedUser = await UserModel.fetchUserById(
          mockModelFactory,
          mockDaoFactory,
          ''
        );

        assert.equal(fetchedUser, null);
      });
      it('returns returns a new instance of the UserModel', async function () {
        const mockModelFactory = {};
        const mockDaoFactory = {
          user: {
            fetchById: sinon.stub().resolves({}),
          },
        };
        const fetchedUser = await UserModel.fetchUserById(
          mockModelFactory,
          mockDaoFactory,
          ''
        );

        assert.instanceOf(fetchedUser, UserModel);
        assert.deepEqual(fetchedUser.ModelFactory, mockModelFactory);
        assert.deepEqual(fetchedUser.DaoFactory, mockDaoFactory);
      });
    });
    describe('verifyJWT', function () {
      it('returns null when there is a bad token', async function () {
        const decodedToken = await UserModel.verifyJWT('', { secret: '' });

        assert.isNull(decodedToken);
      });
      it('verifies a valid token', async function () {
        const decodedToken = await UserModel.verifyJWT(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.jMz7bUEiWa_Ua4gfJT_sDLQxB_SYaDNhAoh2oMOVoo8',
          { secret: 'THIS IS A SECRET' }
        );

        assert.deepEqual(decodedToken, {
          sub: '1234567890',
          name: 'John Doe',
          iat: 1516239022,
        });
      });
    });
  });
});
