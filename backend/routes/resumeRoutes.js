const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadResume, getResumes } = require('../controllers/resumeController');

// Setup multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/', getResumes);

module.exports = router;