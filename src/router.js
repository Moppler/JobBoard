const express = require('express');

const apiRouter = require('./routes/api');
const healthcheckRouter = require('./routes/healthcheck');
const viewRouter = require('./routes/view');

const router = express.Router();

router.use('/api', apiRouter);
router.use('/healthcheck', healthcheckRouter);
router.use('/', viewRouter);

module.exports = router;
