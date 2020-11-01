const assert = require('chai').assert;
const sinon = require('sinon');

const JobModel = require('../../src/models/job');

describe('Model: Job', function () {
  describe('constructor', function () {
    it('Has all the expected keys', function () {
      const job = new JobModel({});

      assert.deepStrictEqual(
        Object.keys(job),
        ['title', 'location', 'salary', 'jobType', 'summary', 'datePosted'],
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
  });
});
