/**
 * @typedef {import('../app').JBRequest} JBRequest
 *
 * @typedef {import('../models/job')} JobModel
 */

module.exports = {
  /**
   * Returns a JSON object containing the version number of the application.
   * This can be used by a load balancer to confirm that the application is both
   * running properly and that it is running the expected version.
   *
   * @param {JBRequest} req
   * @param {*} res
   */
  async listAllJobs(req, res) {
    const jobs = await req.ModelFactory.job.fetchAllJobs(
      req.ModelFactory,
      req.DaoFactory
    );
    const sortedJobs = jobs.sort(
      (a, b) => b.datePosted.toMillis() - a.datePosted.toMillis()
    );

    return await res.status(200).render('listJobs', {
      /** @type {JobModel[]} */
      jobs: sortedJobs,
    });
  },

  /**
   * Renders specific details about a job.
   *
   * @param {JBRequest} req
   * @param {*} res
   */
  async viewJob(req, res) {
    const jobId = parseInt(req.params.jobId);
    const job = await req.ModelFactory.job.fetchById(
      req.ModelFactory,
      req.DaoFactory,
      jobId
    );
    return await res.status(200).render('viewJob', {
      job: {
        id: job.id,
        title: job.title,
        location: job.location,
        salary: job.salary,
        jobType: job.jobType,
        description: job.description,
        datePosted: job.datePosted.toFormat('DDD'),
      },
    });
  },
};
