const express = require('express');
const apiController = require('../controllers/api');

const router = express.Router();

router.get('/jobs', apiController.fetchAllJobs);
router.post('/jobs', apiController.createJob);

router.get('/jobs/:jobId', apiController.fetchJob);
router.patch('/jobs/:jobId', apiController.updateJob);
router.delete('/jobs/:jobId', apiController.deleteJob);

module.exports = router;
