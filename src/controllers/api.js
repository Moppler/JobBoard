/**
 * @typedef {import('../app').JBRequest} JBRequest
 * @typedef {import('../app').JBResponse} JBResponse
 * @typedef {import('../daos/job').JobData} JobData
 */

const { DateTime } = require('luxon');

module.exports = {
  /**
   * Assuming the request body contains valid job details, this function creates
   * a new job and returns a 201. If any of the provided job details are invalid
   * a 400 response is provided. A 500 if there is an unexpected system issue.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
   */
  async createJob(req, res) {
    /** @type {JobData} */
    const jobPayload = req.body;

    if (
      !jobPayload.title ||
      !jobPayload.location ||
      !jobPayload.salary ||
      !jobPayload.jobType ||
      !jobPayload.summary ||
      !jobPayload.description
    ) {
      return res.sendStatus(400);
    }

    // Adding date posted property here before it hits Model to keep the model
    // clean.
    jobPayload.datePosted = DateTime.local();

    const newJob = await req.ModelFactory.job.createJob(
      req.ModelFactory,
      req.DaoFactory,
      jobPayload
    );

    if (!newJob) {
      return res.sendStatus(500);
    }

    return res.sendStatus(201);
  },
};
