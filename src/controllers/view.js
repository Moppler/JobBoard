module.exports = {
  /**
   * Returns a JSON object containing the version number of the application.
   * This can be used by a load balancer to confirm that the application is both
   * running properly and that it is running the expected version.
   *
   * @param {*} req
   * @param {*} res
   */
  async listAllJobs(req, res) {
    return await res.render('listJobs');
  },
};
