const express = require('express');
const exphbs = require('express-handlebars');

const config = require('../config/environment');
const app = express();

const router = require('./router');

/**
 * Adding the config to the request object here makes it available across ALL
 * requests that we add in the future. This removes the need to `require` the
 * config wherever it's required.
 */
app.use((req, res, next) => {
  req.Config = config;
  next();
});

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(router);

app.listen(config.port, () => {
  console.log(`Job Board server listening on http://localhost:${config.port}`);
});
