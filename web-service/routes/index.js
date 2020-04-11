const express = require('express');
const router = express.Router();

var job = require('../controllers/jobsController');

router.get('/listalljobs', job.getAllJobs);

module.exports = router;
