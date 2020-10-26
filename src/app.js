const express = require('express');
const package = require('../package.json');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send({ version: package.version });
});

app.listen(port, () => {
  console.log(`Job Board server listening on http://localhost:${port}`);
});