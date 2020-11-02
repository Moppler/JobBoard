const express = require('express');
const viewController = require('../controllers/view');

const router = express.Router();

router.get('/', viewController.listAllJobs);
router.get('/:jobId', viewController.viewJob);

module.exports = router;
