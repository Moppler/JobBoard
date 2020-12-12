const assert = require('chai').assert;
const { exception } = require('console');
const sinon = require('sinon');

const JobModel = require('../../src/models/job');

describe('Model: Job', function () {
  describe('constructor', function () {
    it('Has all the expected keys', function () {
      const mockModelFactory = sinon.stub();
      const mockDaoFactory = sinon.stub();
      const job = new JobModel(mockModelFactory, mockDaoFactory, {});

      assert.deepStrictEqual(
        Object.keys(job),
        [
          'ModelFactory',
          'DaoFactory',
          'id',
          'title',
          'location',
          'salary',
          'jobType',
          'summary',
          'description',
          'datePosted',
        ],
        ''
      );
    });
  });
  describe('Static Functions', function () {
    describe('fetchAllJobs', function () {
      it('returns new instances of the JobModel', async function () {
        const mockDaoFactory = {
          job: {
            fetchAllJobs: sinon.stub().resolves([
              {
                title: 'Test Title',
                location: 'London',
                salary: '£50,000',
                jobType: 'Temporary',
                summary: 'Lorem ipsum',
                datePosted: '',
              },
            ]),
          },
        };
        const jobs = await JobModel.fetchAllJobs({}, mockDaoFactory);

        assert.ok(
          jobs.every((job) => job instanceof JobModel),
          'Every item in the array returned is an instance of JobModel'
        );
      });
      it('returns empty array when dao returns no data', async function () {
        const mockDaoFactory = {
          job: {
            fetchAllJobs: sinon.stub().resolves([]),
          },
        };
        const jobs = await JobModel.fetchAllJobs({}, mockDaoFactory);

        assert.deepStrictEqual(jobs, [], 'Returns null on error');
      });
      it('returns null when the dao returns null', async function () {
        const mockDaoFactory = {
          job: {
            fetchAllJobs: sinon.stub().resolves(null),
          },
        };
        const jobs = await JobModel.fetchAllJobs({}, mockDaoFactory);

        assert.strictEqual(jobs, null, 'Returns null on error');
      });
    });
    describe('fetchById', function () {
      it('returns an instance of the JobModel', async function () {
        const mockDaoFactory = {
          job: {
            fetchJobById: sinon.stub().resolves({
              id: 1,
              title: 'Test Title',
              location: 'London',
              salary: '£50,000',
              jobType: 'Temporary',
              summary: 'Lorem ipsum',
              description: '',
              datePosted: '',
            }),
          },
        };
        const job = await JobModel.fetchById({}, mockDaoFactory, 1);

        assert.ok(job instanceof JobModel, 'Instance of JobModel is returned');
      });
      it('returns null when the job does not exist', async function () {
        const mockDaoFactory = {
          job: {
            fetchJobById: sinon.stub().resolves(null),
          },
        };
        const job = await JobModel.fetchById({}, mockDaoFactory, 2);

        assert.equal(job, null, 'null is returned');
      });
    });
    describe('createJob', function () {
      it('returns an instance of the JobModel', async function () {
        const mockDaoFactory = {
          job: {
            createJob: sinon.stub().resolves({}),
          },
        };
        const job = await JobModel.createJob({}, mockDaoFactory, {});

        assert.ok(job instanceof JobModel, 'Instance of JobModel is returned');
      });
      it('returns null when the job does not exist', async function () {
        const mockDaoFactory = {
          job: {
            createJob: sinon.stub().resolves(null),
          },
        };
        const job = await JobModel.createJob({}, mockDaoFactory, {});

        assert.equal(job, null, 'null is returned');
      });
    });
  });
  describe('Instance Functions', function () {
    describe('updateJob', function () {
      it('returns null when there is an issue in the Dao', async function () {
        const stubUpdateJob = sinon.stub().resolves(null);
        const mockModelFactory = {};
        const mockDaoFactory = {
          job: {
            updateJob: stubUpdateJob,
          },
        };
        const jobModel = new JobModel(mockModelFactory, mockDaoFactory, {});
        const updateResult = await jobModel.updateJob({});
        assert.equal(updateResult, null);
      });
      it('updates values of instance with correct details', async function () {
        const jobDataUpdate = {
          title: '2',
          location: '3',
          salary: '4',
          jobType: '5',
          summary: '6',
          description: '7',
        };
        const stubUpdateJob = sinon.stub().resolves(jobDataUpdate);
        const mockModelFactory = {};
        const mockDaoFactory = {
          job: {
            updateJob: stubUpdateJob,
          },
        };
        const jobModel = new JobModel(mockModelFactory, mockDaoFactory, {});
        await jobModel.updateJob(jobDataUpdate);

        assert.equal(jobModel.title, 2);
        assert.equal(jobModel.location, 3);
        assert.equal(jobModel.salary, 4);
        assert.equal(jobModel.jobType, 5);
        assert.equal(jobModel.summary, 6);
        assert.equal(jobModel.description, 7);
      });
      it('returns true when resolved correctly', async function () {
        const stubUpdateJob = sinon.stub().resolves({});
        const mockModelFactory = {};
        const mockDaoFactory = {
          job: {
            updateJob: stubUpdateJob,
          },
        };
        const jobModel = new JobModel(mockModelFactory, mockDaoFactory, {});
        const updateResult = await jobModel.updateJob({});
        assert.equal(updateResult, true);
      });
    });
    describe('deleteJob', function () {
      it('returns null when exception in deleteJob function', async function () {
        const stubDeleteJob = sinon.stub().throws(exception);
        const mockModelFactory = {};
        const mockDaoFactory = {
          job: {
            deleteJob: stubDeleteJob,
          },
        };
        const jobModel = new JobModel(mockModelFactory, mockDaoFactory, {});
        const deleteResult = await jobModel.deleteJob({});
        assert.equal(deleteResult, null);
      });
    });
    it('returns true when resolved correctly', async function () {
      const stubDeleteJob = sinon.stub();
      const mockModelFactory = {};
      const mockDaoFactory = {
        job: {
          deleteJob: stubDeleteJob,
        },
      };
      const jobModel = new JobModel(mockModelFactory, mockDaoFactory, {});
      const updateResult = await jobModel.deleteJob();
      assert.equal(updateResult, true);
    });
  });
});
