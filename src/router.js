const express = require('express');

const healthcheckRouter = require('./routes/healthcheck');

const router = express.Router();

router.use('/healthcheck', healthcheckRouter);

module.exports = router;
