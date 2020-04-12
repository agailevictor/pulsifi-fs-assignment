const express = require('express');
const router = express.Router();

var job = require('../controllers/jobsController');
var user = require('../controllers/loginController');

router.get('/listalljobs?', job.getAllJobs);
router.post('/postjob', job.postJob);
router.post('/login', user.loginUser);

module.exports = router;
