const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');
const winston = require('winston');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5001;

// Create upload directories if they don't exist
const uploadsDir = path.join(__dirname, 'uploads');
const audioDir = path.join(__dirname, 'uploads/audio');
const imageDir = path.join(__dirname, 'uploads/images');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Setup logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure storage for audio files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/audio');
  },
  filename: (req, file, cb) => {
    cb(null, `recording-${Date.now()}.m4a`);
  },
});

const upload = multer({ storage });

// Test endpoint
app.get('/api/test', (req, res) => {
  logger.info('Test endpoint called');
  res.json({ 
    message: 'Backend connected successfully!',
    timestamp: new Date().toISOString()
  });
});

// Convert audio file to MP3 format
const convertAudio = (inputPath) => {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace('.m4a', '.mp3');
    
    logger.info(`Converting audio from ${inputPath} to ${outputPath}`);
    
    ffmpeg(inputPath)
      .output(outputPath)
      .on('end', () => {
        logger.info('Audio conversion completed');
        resolve(outputPath);
      })
      .on('error', (err) => {
        logger.error(`Audio conversion error: ${err.message}`);
        reject(err);
      })
      .run();
  });
};

// Transcribe audio to text
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      logger.warn('No audio file provided in request');
      return res.status(400).json({ error: 'No audio file provided' });
    }
    
    logger.info(`Received audio file: ${req.file.path}`);
    
    // Convert audio to MP3 format
    const convertedPath = await convertAudio(req.file.path);
    
    // Create form data for OpenAI API
    const formData = new FormData();
    formData.append('file', fs.createReadStream(convertedPath));
    formData.append('model', 'whisper-1');
    
    logger.info('Sending audio to OpenAI for transcription');
    
    // Send to OpenAI for transcription
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      }
    );
    
    logger.info('Transcription completed successfully');
    
    // Clean up temporary files
    fs.unlinkSync(req.file.path);
    fs.unlinkSync(convertedPath);
    
    return res.json({ text: response.data.text });
  } catch (error) {
    logger.error('Transcription error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

// Generate image from prompt
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      logger.warn('No prompt provided in request');
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    logger.info(`Generating image for prompt: ${prompt}`);
    
    // Enhance the prompt for better album covers
    const enhancedPrompt = `Create a professional album cover art in high quality: ${prompt}. Include music-related visual elements, artistic composition, vibrant colors, and musical imagery.`;
    
    // Generate image with DALL-E
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt: enhancedPrompt,
        n: 1,
        size: '1024x1024',
        response_format: 'url',
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    logger.info('Image generated successfully');
    
    // Option to download and store the image locally
    if (process.env.SAVE_IMAGES_LOCALLY === 'true') {
      try {
        const imageUrl = response.data.data[0].url;
        const imageName = `album-${Date.now()}.png`;
        const imagePath = path.join(__dirname, 'uploads/images', imageName);
        
        logger.info(`Downloading image to ${imagePath}`);
        
        // Download the image
        const imageResponse = await axios({
          url: imageUrl,
          method: 'GET',
          responseType: 'stream'
        });
        
        // Save to file
        const writer = fs.createWriteStream(imagePath);
        imageResponse.data.pipe(writer);
        
        // Wait for download to complete
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
        
        // Return both URLs
        return res.json({
          imageUrl: response.data.data[0].url,
          localImageUrl: `/uploads/images/${imageName}`
        });
      } catch (downloadError) {
        logger.error(`Image download error: ${downloadError.message}`);
        // Continue with the OpenAI URL if download fails
      }
    }
    
    // Return the original OpenAI URL
    return res.json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    logger.error('Image generation error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to generate image' });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  console.log(`Server running on port ${PORT}`);
});