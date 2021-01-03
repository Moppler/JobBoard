/**
 * @typedef {import('../app').JBRequest} JBRequest
 * @typedef {import('../app').JBResponse} JBResponse
 *
 * @typedef {import('../models/job')} JobModel
 */

/**
 * This controller is responsible for everything that is rendered to a user.
 * In the future, should we choose to move away from server-side rendering in
 * favor of something a little more modern, we will replace these controllers
 * with api calls.
 */
module.exports = {
  /**
   * Returns a JSON object containing the version number of the application.
   * This can be used by a load balancer to confirm that the application is both
   * running properly and that it is running the expected version.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
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
      jobs: sortedJobs.map((job) => ({
        id: job.id,
        title: job.title,
        location: job.location,
        salary: job.salary,
        jobType: job.jobType,
        description: job.description,
        datePosted: job.datePosted.toFormat('DDD'),
      })),
    });
  },

  /**
   * Renders specific details about a job.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
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

  /**
   * Renders the dashboard. This page should only be visible to authenticated
   * users.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
   */
  async viewDashboard(req, res) {
    if (!req.User) return res.redirect('/login');

    return await res.status(200).render('dashboard');
  },

  /**
   * Renders the dashboard. This page should only be visible to authenticated
   * users.
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
   */
  async viewLogin(req, res) {
    return await res.status(200).render('loginForm');
  },

  /**
   *
   * @param {JBRequest} req
   * @param {JBResponse} res
   */
  async actionLogin(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).send('Incomplete form');
    }

    const user = await req.ModelFactory.user.fetchUserByEmail(
      req.ModelFactory,
      req.DaoFactory,
      email
    );

    if (!user) return res.sendStatus(404);

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) return res.sendStatus(401);

    // Generate JWT
    const newJWT = await user.generateJWT(req.Config.JWT);

    res.cookie('JWT', newJWT, {
      httpOnly: true,
      sameSite: 'strict',
    });
    return res.redirect('/dashboard');
  },
};
