/**
 * ## What is a Model?
 * Models are where we put all of our business logic. We create one for each
 * major component of our application. In this Job Board app, we will see models
 * for Jobs, Users, Applications. We may also want to model items that are
 * shared across jobs, Location and Industry for example.
 *
 * The model represents a business concern and acts as a central location for
 * working with them.
 */

const JobModel = require('./models/job');
const UserModel = require('./models/user');

module.exports = {
  job: JobModel,
  user: UserModel,
};
