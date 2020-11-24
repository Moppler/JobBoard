const assert = require('chai').assert;
const sinon = require('sinon');

const JobStore = require('../../src/stores/job');

describe('Store: Job', function () {
  describe('constructor', function () {
    it('correctly creates an instance of the store', function () {
      const mockDb = sinon.stub();
      const store = new JobStore(mockDb);

      assert.strictEqual(
        store._db,
        mockDb,
        'DB instances is correctly assigned to _db key'
      );
    });
  });
  describe('fetchAllJobs', function () {
    it('makes correct calls to the jobs table', async function () {
      const mockSelect = sinon.stub();
      const mockDb = sinon.stub().returns({
        select: mockSelect,
      });
      const store = new JobStore(mockDb);

      await store.fetchAllJobs();

      assert.strictEqual(mockDb.getCall(0).args[0], 'jobs');
      assert.ok(mockSelect.called);
    });
    it('returns null when an exception is caught', async function () {
      const mockDb = sinon.stub().throwsException();
      const store = new JobStore(mockDb);

      const response = await store.fetchAllJobs();

      assert.strictEqual(response, null);
    });
  });

  describe('fetchJobById', function () {
    it('makes correct calls to the jobs table', async function () {
      const mockFirst = sinon.stub();
      const mockWhere = sinon.stub();
      const mockDb = sinon.stub().returns({
        first: mockFirst.returns({
          where: mockWhere,
        }),
      });
      const store = new JobStore(mockDb);

      await store.fetchJobById(111);

      assert.strictEqual(mockDb.getCall(0).args[0], 'jobs');
      assert.ok(mockFirst.called);
      assert.strictEqual(mockWhere.getCall(0).args[0], 'id');
      assert.strictEqual(mockWhere.getCall(0).args[1], 111);
    });
    it('returns null when an exception is caught', async function () {
      const mockDb = sinon.stub().throwsException();
      const store = new JobStore(mockDb);

      const response = await store.fetchJobById();

      assert.strictEqual(response, null);
    });
  });

  describe('createJob', function () {
    it('makes correct calls to the jobs table', async function () {
      const mockInsert = sinon.stub();
      const mockReturning = sinon.stub().resolves([{}]);
      const mockDb = sinon.stub().returns({
        insert: mockInsert.returns({
          returning: mockReturning,
        }),
      });
      const store = new JobStore(mockDb);

      await store.createJob({});

      assert.strictEqual(mockDb.getCall(0).args[0], 'jobs');
      assert.ok(mockInsert.getCall(0).args[0], {});
    });
    it('returns null when an exception is caught', async function () {
      const mockDb = sinon.stub().throwsException();
      const store = new JobStore(mockDb);

      const response = await store.createJob();

      assert.strictEqual(response, null);
    });
  });
  describe('updateJob', function () {
    it('makes correct calls to the jobs table', async function () {
      const whereId = { id: 1 };
      const mockWhere = sinon.stub().resolves(whereId);
      const mockUpdate = sinon.stub();
      const mockReturning = sinon.stub().resolves([{}]);
      const mockDb = sinon.stub().returns({
        where: mockWhere.returns({
          update: mockUpdate.returns({
            returning: mockReturning,
          }),
        }),
      });
      const store = new JobStore(mockDb);

      await store.updateJob(1, {});

      assert.strictEqual(mockDb.getCall(0).args[0], 'jobs');
      assert.strictEqual(mockWhere.getCall(0).args[1], 1);
      assert.ok(mockUpdate.getCall(0).args[0], {});
    });
    it('returns null when an exception is caught', async function () {
      const mockDb = sinon.stub().throwsException();
      const store = new JobStore(mockDb);

      const response = await store.updateJob();

      assert.strictEqual(response, null);
    });
  });
});
