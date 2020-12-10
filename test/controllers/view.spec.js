const assert = require('chai').assert;
const sinon = require('sinon');
const { DateTime } = require('luxon');

const viewController = require('../../src/controllers/view');
const JobModel = require('../../src/models/job');

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
    it('redirects to login if the user is not authed', async function () {
      const mockRedirect = sinon.stub();

      const mockRequest = {
        User: null,
      };
      const mockResponse = {
        redirect: mockRedirect,
      };

      viewController.viewDashboard(mockRequest, mockResponse);

      assert.equal(mockRedirect.getCall(0).args[0], '/login');
    });
    it('renders the correct template if the user is authed', async function () {
      const mockStatus = sinon.stub();
      const mockRender = sinon.stub();

      const mockRequest = {
        User: 'Pretend I am a UserObject',
      };
      const mockResponse = {
        status: mockStatus.returns({
          render: mockRender,
        }),
      };

      viewController.viewDashboard(mockRequest, mockResponse);

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
    it('returns a 404 if the user does not exist', async function () {
      const mockFetchUserByEmail = sinon.stub();
      const mockSendStatus = sinon.stub();
      const mockRequest = {
        body: {
          email: 'EMAIL',
          password: 'PASSWORD',
        },
        ModelFactory: {
          user: {
            fetchUserByEmail: mockFetchUserByEmail.resolves(null),
          },
        },
        DaoFactory: sinon.stub(),
      };
      const mockResponse = {
        sendStatus: mockSendStatus,
      };

      await viewController.actionLogin(mockRequest, mockResponse);

      assert.equal(
        mockFetchUserByEmail.getCall(0).args[0],
        mockRequest.ModelFactory
      );
      assert.equal(
        mockFetchUserByEmail.getCall(0).args[1],
        mockRequest.DaoFactory
      );
      assert.equal(mockFetchUserByEmail.getCall(0).args[2], 'EMAIL');
      assert.equal(mockSendStatus.getCall(0).args[0], 404);
    });
    it('calls validate password on the userModel and responds with a 401 if invalid', async function () {
      const mockUserModelInstance = {
        validatePassword: sinon.stub().resolves(false),
      };

      const mockFetchUserByEmail = sinon.stub();
      const mockSendStatus = sinon.stub();
      const mockRequest = {
        body: {
          email: 'EMAIL',
          password: 'PASSWORD',
        },
        ModelFactory: {
          user: {
            fetchUserByEmail: mockFetchUserByEmail.resolves(
              mockUserModelInstance
            ),
          },
        },
        DaoFactory: sinon.stub(),
      };
      const mockResponse = {
        sendStatus: mockSendStatus,
      };

      await viewController.actionLogin(mockRequest, mockResponse);

      assert.equal(mockSendStatus.getCall(0).args[0], 401);
    });
    it('generates a JWT, sets it as a Cookie and redirects to the dashboard', async function () {
      const mockUserModelInstance = {
        validatePassword: sinon.stub().resolves(true),
        generateJWT: sinon.stub().resolves('THIS IS A JWT'),
      };

      const mockFetchUserByEmail = sinon.stub();
      const mockCookieSetter = sinon.stub();
      const mockRedirect = sinon.stub();
      const mockRequest = {
        body: {
          email: 'EMAIL',
          password: 'PASSWORD',
        },
        ModelFactory: {
          user: {
            fetchUserByEmail: mockFetchUserByEmail.resolves(
              mockUserModelInstance
            ),
          },
        },
        DaoFactory: sinon.stub(),
        Config: {
          JWT: {},
        },
      };
      const mockResponse = {
        cookie: mockCookieSetter,
        redirect: mockRedirect,
      };

      await viewController.actionLogin(mockRequest, mockResponse);

      assert.equal(
        mockCookieSetter.getCall(0).args[0],
        'JWT',
        'Cookie name is correct'
      );
      assert.equal(mockCookieSetter.getCall(0).args[1], 'THIS IS A JWT');
      assert.equal(mockCookieSetter.getCall(0).args[2].httpOnly, true);
      assert.equal(mockCookieSetter.getCall(0).args[2].sameSite, 'strict');

      assert.equal(mockRedirect.getCall(0).args[0], '/dashboard');
    });
  });
});
