const assert = require('chai').assert;
const sinon = require('sinon');
const { DateTime } = require('luxon');

const viewController = require('../../src/controllers/view');
const JobModel = require('../../src/models/job');
const { before } = require('mocha');

describe('Controller: view', function () {
  describe('listAllJobs', function () {
    it('renders the correct template', async function () {
      const stubRender = sinon.stub();
      const stubStatus = sinon.stub();

      const mockJobModel = {
        fetchAllJobs: sinon.stub().resolves([]),
      };

      const mockRequest = {
        ModelFactory: {
          job: mockJobModel,
        },
      };
      const mockResponse = {
        status: stubStatus.returns({
          render: stubRender,
        }),
      };

      await viewController.listAllJobs(mockRequest, mockResponse);

      assert.strictEqual(stubRender.getCall(0).args[0], 'listJobs');
    });
    it('Sorts jobs by date, newest first', async function () {
      const mockModelFactory = sinon.stub();
      const mockDaoFactory = sinon.stub();
      const mockJobs = [
        new JobModel(mockModelFactory, mockDaoFactory, {
          title: 'job 1',
          datePosted: DateTime.local(2020, 1, 1),
        }),
        new JobModel(mockModelFactory, mockDaoFactory, {
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
      const stubStatus = sinon.stub();

      const mockResponse = {
        status: stubStatus.returns({
          render: stubRender,
        }),
      };

      await viewController.listAllJobs(mockRequest, mockResponse);

      assert.strictEqual(
        stubRender.getCall(0).args[1].jobs[0].title,
        mockJobs[1].title,
        'The first item in the array is the second mocked job, as it has a more recent date.'
      );
    });
  });
  describe('viewJob', function () {
    it('renders the correct template', async function () {
      const stubRender = sinon.stub();
      const stubStatus = sinon.stub();

      const mockJobModel = {
        fetchById: sinon.stub().resolves({
          id: 1,
          title: '',
          location: '',
          salary: '',
          jobType: '',
          description: '',
          datePosted: DateTime.local(),
        }),
      };

      const mockRequest = {
        params: {
          jobId: 1,
        },
        ModelFactory: {
          job: mockJobModel,
        },
      };
      const mockResponse = {
        status: stubStatus.returns({
          render: stubRender,
        }),
      };

      await viewController.viewJob(mockRequest, mockResponse);

      assert.strictEqual(stubRender.getCall(0).args[0], 'viewJob');
    });
  });
  describe('viewDashboard', function () {
    it('renders the correct template', async function () {
      const mockStatus = sinon.stub();
      const mockRender = sinon.stub();

      const mockResponse = {
        status: mockStatus.returns({
          render: mockRender,
        }),
      };

      viewController.viewDashboard({}, mockResponse);

      assert.equal(mockStatus.getCall(0).args[0], 200);
      assert.equal(mockRender.getCall(0).args[0], 'dashboard');
    });
  });
  describe('viewLogin', function () {
    it('renders the correct template', async function () {
      const mockStatus = sinon.stub();
      const mockRender = sinon.stub();

      const mockResponse = {
        status: mockStatus.returns({
          render: mockRender,
        }),
      };

      viewController.viewLogin({}, mockResponse);

      assert.equal(mockStatus.getCall(0).args[0], 200);
      assert.equal(mockRender.getCall(0).args[0], 'loginForm');
    });
  });
  describe('actionLogin', function () {
    describe('validate input params', function () {
      beforeEach(function () {
        this.statusStub = sinon.stub();
        this.sendStub = sinon.stub();
        this.mockResponse = {
          status: this.statusStub.returns({
            send: this.sendStub,
          }),
        };
      });
      it('has a mandatory email', async function () {
        const mockRequest = { body: { email: '', password: 'PASSWORD' } };

        await viewController.actionLogin(mockRequest, this.mockResponse);

        assert.equal(this.statusStub.getCall(0).args[0], 400);
        assert.equal(this.sendStub.getCall(0).args[0], 'Incomplete form');
      });
      it('has a mandatory password', async function () {
        const mockRequest = { body: { email: 'EMAIL', password: '' } };

        await viewController.actionLogin(mockRequest, this.mockResponse);

        assert.equal(this.statusStub.getCall(0).args[0], 400);
        assert.equal(this.sendStub.getCall(0).args[0], 'Incomplete form');
      });
    });
  });
});
