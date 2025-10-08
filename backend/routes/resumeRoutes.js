const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume, getResumes } = require('../controllers/resumeController');

// 1. Configure multer to store files in memory as a buffer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 2. The route now uses the new in-memory upload configuration
router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getResumes);

module.exports = router;