const express = require('express');
const apiController = require('../controllers/api');

const router = express.Router();

router.post('/jobs', apiController.createJob);

router.get('/jobs/:jobId', apiController.fetchJob);

module.exports = router;
