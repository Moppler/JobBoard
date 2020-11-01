const assert = require('chai').assert;
const sinon = require('sinon');

const viewController = require('../../src/controllers/view');
const JobModel = require('../../src/models/job');
const jobModel = require('../../src/models/job');

describe('Controller: view', function () {
  describe('listAllJobs', function () {
    it('renders the correct template', async function () {
      const stubRender = sinon.stub();
      const mockJobModel = {
        fetchAllJobs: sinon.stub().resolves([]),
      };

      const mockRequest = {
        ModelFactory: {
          job: mockJobModel,
        },
      };
      const mockResponse = {
        render: stubRender,
      };

      await viewController.listAllJobs(mockRequest, mockResponse);

      assert.strictEqual(stubRender.getCall(0).args[0], 'listJobs');
    });
    it('Sorts jobs by date, newest first', async function () {
      const mockJobs = [
        new JobModel({
          datePosted: new Date('2020/01/01'),
        }),
        new JobModel({
          datePosted: new Date('2020/01/02'),
        }),
      ];
      const stubRender = sinon.stub();
      const mockJobModel = {
        fetchAllJobs: sinon.stub().resolves(mockJobs),
      };

      const mockRequest = {
        ModelFactory: {
          job: mockJobModel,
        },
      };
      const mockResponse = {
        render: stubRender,
      };

      await viewController.listAllJobs(mockRequest, mockResponse);

      assert.strictEqual(
        stubRender.getCall(0).args[1].jobs[0],
        mockJobs[1],
        'The first item in the array is the second mocked job, as it has a more recent date.'
      );
    });
  });
});
