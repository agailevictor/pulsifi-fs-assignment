const express = require('express');
const router = express.Router();

var job = require('../controllers/jobsController');

router.get('/listalljobs', job.getAllJobs);
router.post('/postjob', job.postJob);

module.exports = router;
