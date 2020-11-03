/**
 * @typedef {object} _JobBoardRequest
 * @property {import('../config/environment')} Config - App Config
 * @property {import('./modelFactory')} ModelFactory - Instance of
 * @property {import('./daoFactory')} DaoFactory - Instance of
 */

/**
 * @typedef {import('express').Request & _JobBoardRequest} JBRequest
 */

const express = require('express');
const exphbs = require('express-handlebars');

const config = require('../config/environment');
const app = express();

const router = require('./router');
const ModelFactory = require('./modelFactory');
const DaoFactory = require('./daoFactory');
const StoreFactory = require('./storeFactory');

const storeFactory = new StoreFactory(/* config */);
const modelFactory = ModelFactory;
const daoFactory = new DaoFactory(storeFactory);

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
