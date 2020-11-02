const assert = require('chai').assert;
const sinon = require('sinon');

const healthcheckController = require('../../src/controllers/healthcheck');

describe('Controller: healthcheck', function () {
  describe('fetchHealthcheck', function () {
    it('Responds with a 200 status and the correct version', function () {
      const stubStatus = sinon.stub();
      const stubJson = sinon.stub();

      const mockRequest = {
        Config: {
          version: 'TESTVERSION',
        },
      };
      const mockResponse = {
        status: stubStatus.returns({
          json: stubJson,
        }),
      };

      healthcheckController.fetchHealthcheck(mockRequest, mockResponse);

      const responseStatus = stubStatus.getCall(0).args[0];
      assert.strictEqual(
        responseStatus,
        200,
        'The HTTP status code specified in the response is correct.'
      );

      const responseBody = stubJson.getCall(0).args[0];
      assert.deepStrictEqual(
        responseBody,
        { version: 'TESTVERSION' },
        'Response body contains correctly structured JSON object.'
      );
    });
  });
});
