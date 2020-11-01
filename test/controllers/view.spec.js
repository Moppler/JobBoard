const assert = require('chai').assert;
const sinon = require('sinon');

const viewController = require('../../src/controllers/view');

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
  });
});
