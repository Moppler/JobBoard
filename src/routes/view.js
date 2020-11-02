const express = require('express');
const viewController = require('../controllers/view');

const router = express.Router();

router.get('/', viewController.listAllJobs);

module.exports = router;
