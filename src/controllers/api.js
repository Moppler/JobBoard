/**
 * @typedef {import('../app').JBRequest} JBRequest
 * @typedef {import('../app').JBResponse} JBResponse
 * @typedef {import('../daos/job').JobData} JobData
 */

const { DateTime } = require('luxon');

module.exports = {
  /**
   * Fetches all jobs from the system and returns then in this endpoint. If
   * there are no jobs, an empty array is returned.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
   */
  async fetchAllJobs(req, res) {
    const allJobs = await req.ModelFactory.job.fetchAllJobs(
      req.ModelFactory,
      req.DaoFactory
    );
    // console.log(allJobs);
    return res.status(200).json(
      allJobs.map((job) => ({
        id: job.id,
        title: job.title,
        location: job.location,
        salary: job.salary,
        jobType: job.jobType,
        summary: job.summary,
        description: job.description,
        datePosted: job.datePosted,
      }))
    );
  },

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

  /**
   * Fetches a single job from the system and returns it. If the job does not
   * exist, a 404 is returned. If the requested jobId is not a number, a 400
   * is returned.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
   */
  async fetchJob(req, res) {
    const jobId = parseInt(req.params.jobId);

    if (!jobId) return res.sendStatus(400);

    const job = await req.ModelFactory.job.fetchById(
      req.ModelFactory,
      req.DaoFactory,
      jobId
    );

    if (!job) return res.sendStatus(404);

    return res.status(200).json({
      id: job.id,
      title: job.title,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      summary: job.summary,
      description: job.description,
      datePosted: job.datePosted,
    });
  },

  /**
   * Fetches a single job from the system and returns it. If the job does not
   * exist, a 404 is returned. If the requested jobId is not a number, a 400
   * is returned.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
   */
  async updateJob(req, res) {
    const jobId = parseInt(req.params.jobId);
    const jobPayload = req.body;

    if (!jobId || (jobPayload.id && jobPayload.id !== jobId)) {
      return res.sendStatus(400);
    }

    const job = await req.ModelFactory.job.fetchById(
      req.ModelFactory,
      req.DaoFactory,
      jobId
    );

    if (!job) return res.sendStatus(404);

    await job.updateJob(jobPayload);

    return res.status(200).json({
      id: job.id,
      title: job.title,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      summary: job.summary,
      description: job.description,
      datePosted: job.datePosted,
    });
  },
  /**
   * Fetches a single job from the system and deletes it. If the job does not
   * exist, a 404 is returned. If the requested jobId is not a number, a 400
   * is returned.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
   */
  async deleteJob(req, res) {
    const jobId = parseInt(req.params.jobId);

    if (!jobId) return res.sendStatus(400);

    const job = await req.ModelFactory.job.fetchById(
      req.ModelFactory,
      req.DaoFactory,
      jobId
    );

    if (!job) return res.sendStatus(404);

    try {
      await job.deleteJob();
      return res.sendStatus(204);
    } catch (e) {
      return null;
    }
  },
};
