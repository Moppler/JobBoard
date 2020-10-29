const express = require('express');
const config = require('../config/environment');
const app = express();

const healthcheckController = require('./controllers/healthcheck');

app.use((req, res, next) => {
  req.Config = config;
  next();
});

app.get('/healthcheck', healthcheckController.fetchHealthcheck);

app.listen(config.port, () => {
  console.log(`Job Board server listening on http://localhost:${config.port}`);
});