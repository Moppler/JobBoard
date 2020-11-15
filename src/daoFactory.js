/**
 * ## What is a DAO?
 * DAO stands for Data Access Object. It is responsible for, as the name
 * suggests, dealing with data. It is the piece of code that knows where data is
 * stored and how to manipulate it. This could be a database, via an API or even
 * hard coded data.
 *
 * The purpose of the DAO is to separate the business logic in the Models from
 * the storage mechanisms. This separation is crucial to developing scalable
 * systems as it provides us with nice, clean interfaces between our application
 * logic and the data itself. These clear interfaces make it easy for us to
 * change data storage without the need to mess with a lot of our code.
 *
 * For example, if we wanted to move from data being stored in our database, to
 * calling an API. We need only to re-write the DAO logic for data management.
 * There is no need to worry about breaking functionality. This makes a
 * transition considerably easier as there is a much smaller surface area for
 * failure.
 *
 * DAOs also offer us an easy way to add additional data stores. For example,
 * we may already be fetching data from our database. If we wanted to suppliment
 * that data from a 3rd party API. We can easily add that to the appropriate DAO
 * method. All business logic code will continue to work as normal. As far as
 * it's concerned, there is no change.
 */

/**
 * @typedef {import('./storeFactory')} StoreFactory
 */

const JobDao = require('./daos/job');
const UserDao = require('./daos/user');

class DaoFactory {
  /**
   * @param {StoreFactory} StoreFactory - Instance of
   */
  constructor(StoreFactory) {
    this.job = new JobDao(StoreFactory.job);
    this.user = new UserDao(StoreFactory.user);
  }
}

module.exports = DaoFactory;
