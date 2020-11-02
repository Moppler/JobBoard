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
    return await res.render('listJobs', {
      /** @type {JobModel[]} */
      jobs: sortedJobs,
    });
  },
};
