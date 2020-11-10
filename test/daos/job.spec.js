const assert = require('chai').assert;
const sinon = require('sinon');

const { DateTime } = require('luxon');
const JobDao = require('../../src/daos/job');

describe('Dao: Job', function () {
  describe('_JobRowtoJobData', function () {
    it('correctly maps a JobRow to JobData', function () {
      const dao = new JobDao();

      const jobRow = {
        id: 1,
        title: '2',
        location: '3',
        salary: '4',
        jobType: '5',
        summary: '6',
        description: '7',
        datePosted: '2020-01-01',
      };

      const jobData = dao._JobRowtoJobData(jobRow);

      assert.equal(jobData.id, 1);
      assert.equal(jobData.title, 2);
      assert.equal(jobData.location, 3);
      assert.equal(jobData.salary, 4);
      assert.equal(jobData.jobType, 5);
      assert.equal(jobData.summary, 6);
      assert.equal(jobData.description, 7);

      assert.instanceOf(jobData.datePosted, DateTime);
    });
  });
  describe('fetchAllJobs', function () {
    it('Resolves an array of job data', async function () {
      const mockJobStore = {
        fetchAllJobs: sinon.stub().returns([
          {
            id: 1,
          },
        ]),
      };

      const dao = new JobDao(mockJobStore);

      const jobData = await dao.fetchAllJobs();

      assert.isArray(jobData);
    });
  });
  describe('fetchJobById', function () {
    it('responds with the requested record', async function () {
      const mockJobStore = {
        fetchJobById: sinon.stub().returns({
          id: 1,
        }),
      };

      const dao = new JobDao(mockJobStore);

      const jobData = await dao.fetchJobById(1);

      assert.equal(jobData.id, 1);
    });
  });
});
