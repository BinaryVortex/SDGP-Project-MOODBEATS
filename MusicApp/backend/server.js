const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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
  res.json({ message: 'Backend connected successfully!' });
});

// Convert audio file to MP3 format
const convertAudio = (inputPath) => {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace('.m4a', '.mp3');
    
    ffmpeg(inputPath)
      .output(outputPath)
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .run();
  });
};

// Transcribe audio to text
app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Convert audio to MP3 format
    const convertedPath = await convertAudio(req.file.path);
    
    // Create form data for OpenAI API
    const formData = new FormData();
    formData.append('file', fs.createReadStream(convertedPath));
    formData.append('model', 'whisper-1');

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

    // Clean up temporary files
    fs.unlinkSync(req.file.path);
    fs.unlinkSync(convertedPath);

    return res.json({ text: response.data.text });
  } catch (error) {
    console.error('Transcription error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

// Generate image from prompt
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

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

    return res.json({ imageUrl: response.data.data[0].url });
  } catch (error) {
    console.error('Image generation error:', error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});