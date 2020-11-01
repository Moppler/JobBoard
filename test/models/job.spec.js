/** @type {any} */
const assert = require('assert');

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
        const jobs = await JobModel.fetchAllJobs();

        assert.ok(
          jobs.every((job) => job instanceof JobModel),
          'Every item in the array returned is an instance of JobModel'
        );
      });
    });
  });
});
