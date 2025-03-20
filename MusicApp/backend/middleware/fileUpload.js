const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directories if they don't exist
const createUploadDirs = () => {
  const dirs = [
    path.join(__dirname, '../uploads'),
    path.join(__dirname, '../uploads/audio'),
    path.join(__dirname, '../uploads/images')
  ];
  
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
};

// Create directories on module import
createUploadDirs();

// Configure storage for audio files
const audioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/audio'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname) || '.m4a';
    cb(null, `recording-${timestamp}${ext}`);
  },
});

// Configure storage for image files (if needed)
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/images'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname) || '.png';
    cb(null, `image-${timestamp}${ext}`);
  },
});

// File filter for audio files
const audioFilter = (req, file, cb) => {
  const allowedMimes = [
    'audio/mpeg',
    'audio/mp3',
    'audio/mp4',
    'audio/wav',
    'audio/ogg',
    'audio/webm',
    'audio/m4a',
    'audio/x-m4a'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Only audio files are allowed.`), false);
  }
};

// File filter for image files
const imageFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type: ${file.mimetype}. Only image files are allowed.`), false);
  }
};

// Set file size limits (in bytes)
const fileSizeLimits = {
  audio: 10 * 1024 * 1024, // 10MB
  image: 5 * 1024 * 1024   // 5MB
};

// Create multer instances
const audioUpload = multer({
  storage: audioStorage,
  fileFilter: audioFilter,
  limits: {
    fileSize: fileSizeLimits.audio
  }
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: fileSizeLimits.image
  }
});

// Export the multer instances
module.exports = {
  audio: audioUpload,
  image: imageUpload,
  createUploadDirs
};