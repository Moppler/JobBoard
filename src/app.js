const express = require('express');
const config = require('../config/environment');
const app = express();

const healthcheckController = require('./controllers/healthcheck');

/**
 * Adding the config to the request object here makes it available across ALL
 * requests that we add in the future. This removes the need to `require` the
 * config wherever it's required. 
 */
app.use((req, res, next) => {
  req.Config = config;
  next();
});

app.get('/healthcheck', healthcheckController.fetchHealthcheck);

app.listen(config.port, () => {
  console.log(`Job Board server listening on http://localhost:${config.port}`);
});