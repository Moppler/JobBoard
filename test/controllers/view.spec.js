const assert = require('chai').assert;
const sinon = require('sinon');
const { DateTime } = require('luxon');

const viewController = require('../../src/controllers/view');
const JobModel = require('../../src/models/job');

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
          title: 'job 1',
          datePosted: DateTime.local(2020, 1, 1),
        }),
        new JobModel({
          title: 'job 2',
          datePosted: DateTime.local(2020, 1, 2),
        }),
      ];

      const mockRequest = {
        ModelFactory: {
          job: {
            fetchAllJobs: sinon.stub().resolves([...mockJobs]), // [...] because the sort mutates the array.
          },
        },
      };

      const stubRender = sinon.stub();
      const mockResponse = {
        render: stubRender,
      };

      await viewController.listAllJobs(mockRequest, mockResponse);

      assert.strictEqual(
        stubRender.getCall(0).args[1].jobs[0].title,
        mockJobs[1].title,
        'The first item in the array is the second mocked job, as it has a more recent date.'
      );
    });
  });
});
