/**
 * @typedef {object} _JobBoardRequest
 * @property {import('../config/environment')} Config - App Config
 * @property {import('./modelFactory')} ModelFactory - Instance of
 * @property {import('./daoFactory')} DaoFactory - Instance of
 * @property {import('./models/user')} User - authenticated user
 */

/**
 * @typedef {import('express').Request & _JobBoardRequest} JBRequest
 * @typedef {import('express').Response} JBResponse
 */

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

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
    req.User = null;
    next();
  }
);

/**
 * If a JWT cookie is present, it will be verified. If valid, the appropriate
 * UserModel instance will be added to the request object.
 */
app.use(
  /**
   * @param {JBRequest} req
   */
  async (req, res, next) => {
    const JWTCookie = req.cookies.JWT;
    if (!JWTCookie) return next();

    const JWTPayload = await req.ModelFactory.user.verifyJWT(
      JWTCookie,
      req.Config.JWT
    );
    if (!JWTPayload) return next();

    const authedUser = await req.ModelFactory.user.fetchUserById(
      req.ModelFactory,
      req.DaoFactory,
      JWTPayload.userId
    );

    req.User = authedUser;
    next();
  }
);

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(router);

app.listen(config.port, () => {
  console.log(`Job Board server listening on http://localhost:${config.port}`);
});
