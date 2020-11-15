const assert = require('chai').assert;
const sinon = require('sinon');

const apiController = require('../../src/controllers/api');

describe('Controller: api', function () {
  describe('createJob', function () {
    // TODO: Test each of input parameters
    it('returns 400 when some data is missing from the POST request', async function () {
      const mockRequest = {
        body: {
          title: '',
          location: '',
          salary: '',
          jobType: '',
          summary: '',
          description: '',
        },
      };
      const mockResponse = {
        sendStatus: sinon.stub(),
      };

      await apiController.createJob(mockRequest, mockResponse);

      assert.equal(mockResponse.sendStatus.getCall(0).args[0], 400);
    });
    it('returns 500 if a valid job fails to be created', async function () {
      const mockRequest = {
        body: {
          title: '1',
          location: '2',
          salary: '3',
          jobType: '4',
          summary: '5',
          description: '6',
        },
        ModelFactory: {
          job: {
            createJob: sinon.stub().resolves(null),
          },
        },
      };
      const mockResponse = {
        sendStatus: sinon.stub(),
      };

      await apiController.createJob(mockRequest, mockResponse);

      assert.equal(mockResponse.sendStatus.getCall(0).args[0], 500);
    });
    it('returns 201 if a valid job is created', async function () {
      const mockRequest = {
        body: {
          title: '1',
          location: '2',
          salary: '3',
          jobType: '4',
          summary: '5',
          description: '6',
        },
        ModelFactory: {
          job: {
            createJob: sinon.stub().resolves({}),
          },
        },
      };
      const mockResponse = {
        sendStatus: sinon.stub(),
      };

      await apiController.createJob(mockRequest, mockResponse);

      assert.equal(mockResponse.sendStatus.getCall(0).args[0], 201);
    });
  });
});
