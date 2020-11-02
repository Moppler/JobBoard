const assert = require('chai').assert;

const JobDao = require('../../src/daos/job');

describe('Dao: Job', function () {
  describe('fetchAllJobs', function () {
    it('Resolves an array of job data', async function () {
      const dao = new JobDao();

      const jobData = await dao.fetchAllJobs();

      assert.isArray(jobData);
    });
  });
});
