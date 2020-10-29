const express = require('express');
const config = require('../config/environment');
const app = express();

app.get('/', (req, res) => {
  res.send({ version: config.version });
});

app.get('/healthcheck', (req, res) => {
  res.send({ version: config.version });
});

app.listen(config.port, () => {
  console.log(`Job Board server listening on http://localhost:${config.port}`);
});