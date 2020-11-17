/**
 * @typedef {object} _JobBoardRequest
 * @property {import('../config/environment')} Config - App Config
 * @property {import('./modelFactory')} ModelFactory - Instance of
 * @property {import('./daoFactory')} DaoFactory - Instance of
 */

/**
 * @typedef {import('express').Request & _JobBoardRequest} JBRequest
 * @typedef {import('express').Response} JBResponse
 */

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const config = require('../config/environment');
const app = express();

const router = require('./router');
const ModelFactory = require('./modelFactory');
const DaoFactory = require('./daoFactory');
const StoreFactory = require('./storeFactory');

const knex = require('knex')(config.database);

const storeFactory = new StoreFactory(knex);
const modelFactory = ModelFactory;
const daoFactory = new DaoFactory(storeFactory);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Adding the config to the request object here makes it available across ALL
 * requests that we add in the future. This removes the need to `require` the
 * config wherever it's required.
 *
 * The ModelFactory provides an easy way to access the application's models.
 */
app.use(
  /**
   * @param {JBRequest} req
   */
  (req, res, next) => {
    req.Config = config;
    req.ModelFactory = modelFactory;
    req.DaoFactory = daoFactory;
    next();
  }
);

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(router);

app.listen(config.port, () => {
  console.log(`Job Board server listening on http://localhost:${config.port}`);
});
