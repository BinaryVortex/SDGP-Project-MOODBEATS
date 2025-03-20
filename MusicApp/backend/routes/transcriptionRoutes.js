const express = require('express');
const multer = require('multer');
const path = require('path');
const transcriptionController = require('../controllers/transcriptionController');
const router = express.Router();

// Configure multer for audio file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
  fileFilter: (req, file, cb) => {
    // Accept only audio files
    const allowedMimeTypes = ['audio/mpeg', 'audio/m4a', 'audio/wav', 'audio/mp3', 'audio/webm'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only audio files are allowed.'), false);
    }
  }
});

// Routes
router.post('/', upload.single('audio'), transcriptionController.transcribeAudio);

module.exports = router;