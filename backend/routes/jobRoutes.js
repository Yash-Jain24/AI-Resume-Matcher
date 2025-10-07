const express = require('express');
const router = express.Router();
const { postJob, getJobs, findMatchesForJob, analyzeJobDescription } = require('../controllers/jobController');

router.post('/', postJob);
router.get('/', getJobs);
router.get('/:jobId/match', findMatchesForJob);
router.post('/analyze', analyzeJobDescription);

module.exports = router;