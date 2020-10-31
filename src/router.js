const express = require('express');

const healthcheckRouter = require('./routes/healthcheck');
const viewRouter = require('./routes/view');

const router = express.Router();

router.use('/healthcheck', healthcheckRouter);
router.use('/', viewRouter);

module.exports = router;
