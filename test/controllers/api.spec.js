const assert = require('chai').assert;
const sinon = require('sinon');

const apiController = require('../../src/controllers/api');

describe('Controller: api', function () {
  describe('fetchAllJobs', function () {
    it('responds with an empty array when there are no jobs', async function () {
      const mockStatus = sinon.stub();
      const mockJson = sinon.stub();

      const mockRequest = {
        ModelFactory: {
          job: {
            fetchAllJobs: sinon.stub().resolves([]),
          },
        },
      };
      const mockResponse = {
        status: mockStatus.returns({
          json: mockJson,
        }),
      };

      await apiController.fetchAllJobs(mockRequest, mockResponse);

      assert.equal(mockStatus.getCall(0).args[0], 200);

      assert.isArray(mockJson.getCall(0).args[0]);
    });
    it('jobs have the correct properties', async function () {
      const mockStatus = sinon.stub();
      const mockJson = sinon.stub();

      const mockRequest = {
        ModelFactory: {
          job: {
            fetchAllJobs: sinon.stub().resolves([
              {
                id: '1',
                title: '2',
                location: '3',
                salary: '4',
                jobType: '5',
                summary: '6',
                description: '7',
                datePosted: '8',
              },
            ]),
          },
        },
      };
      const mockResponse = {
        status: mockStatus.returns({
          json: mockJson,
        }),
      };

      await apiController.fetchAllJobs(mockRequest, mockResponse);

      assert.equal(mockStatus.getCall(0).args[0], 200);

      assert.deepEqual(Object.keys(mockJson.getCall(0).args[0][0]), [
        'id',
        'title',
        'location',
        'salary',
        'jobType',
        'summary',
        'description',
        'datePosted',
      ]);

      // Test that the correct properties are mapped to the correct job 
      // attributes.
      assert.equal(mockJson.getCall(0).args[0][0].id, 1);
      assert.equal(mockJson.getCall(0).args[0][0].title, 2);
      assert.equal(mockJson.getCall(0).args[0][0].location, 3);
      assert.equal(mockJson.getCall(0).args[0][0].salary, 4);
      assert.equal(mockJson.getCall(0).args[0][0].jobType, 5);
      assert.equal(mockJson.getCall(0).args[0][0].summary, 6);
      assert.equal(mockJson.getCall(0).args[0][0].description, 7);
      assert.equal(mockJson.getCall(0).args[0][0].datePosted, 8);
    });
  });
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
  describe('fetchJob', function () {
    it('returns a 400 if the requested jobId is not numeric', async function () {
      const mockStatus = sinon.stub();

      const mockRequest = {
        params: {
          jobId: 'test',
        },
      };
      const mockResponse = {
        sendStatus: mockStatus,
      };

      await apiController.fetchJob(mockRequest, mockResponse);

      assert.equal(mockStatus.getCall(0).args[0], 400);
    });
    it('returns a 404 if the requested job does not exist', async function () {
      const mockStatus = sinon.stub();

      const mockRequest = {
        params: {
          jobId: '1111',
        },
        ModelFactory: {
          job: {
            fetchById: sinon.stub().resolves(null),
          },
        },
      };
      const mockResponse = {
        sendStatus: mockStatus,
      };

      await apiController.fetchJob(mockRequest, mockResponse);

      assert.equal(mockStatus.getCall(0).args[0], 404);
    });
    it('jobs have the correct properties', async function () {
      const mockStatus = sinon.stub();
      const mockJson = sinon.stub();

      const mockRequest = {
        params: {
          jobId: 1,
        },
        ModelFactory: {
          job: {
            fetchById: sinon.stub().resolves({
              id: 1,
              title: 2,
              location: 3,
              salary: 4,
              jobType: 5,
              summary: 6,
              description: 7,
              datePosted: 8,
            }),
          },
        },
      };
      const mockResponse = {
        status: mockStatus.returns({
          json: mockJson,
        }),
      };

      await apiController.fetchJob(mockRequest, mockResponse);

      assert.equal(mockStatus.getCall(0).args[0], 200);

      assert.deepEqual(Object.keys(mockJson.getCall(0).args[0]), [
        'id',
        'title',
        'location',
        'salary',
        'jobType',
        'summary',
        'description',
        'datePosted',
      ]);

      // Test that the correct properties are mapped to the correct job
      // attributes.
      assert.equal(mockJson.getCall(0).args[0].id, 1);
      assert.equal(mockJson.getCall(0).args[0].title, 2);
      assert.equal(mockJson.getCall(0).args[0].location, 3);
      assert.equal(mockJson.getCall(0).args[0].salary, 4);
      assert.equal(mockJson.getCall(0).args[0].jobType, 5);
      assert.equal(mockJson.getCall(0).args[0].summary, 6);
      assert.equal(mockJson.getCall(0).args[0].description, 7);
      assert.equal(mockJson.getCall(0).args[0].datePosted, 8);
    });
  });
});
