const express = require('express');
const viewController = require('../controllers/view');

const router = express.Router();

router.get('/', viewController.listAllJobs);
router.get('/job/:jobId', viewController.viewJob);

router.get('/dashboard', viewController.viewDashboard);
router.get('/login', viewController.viewLogin);

module.exports = router;
