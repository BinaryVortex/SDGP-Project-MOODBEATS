const fs = require('fs');
const { OpenAI } = require('openai');
const logger = require('../utils/logger');
const config = require('../utils/config');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY
});

/**
 * Transcribe audio file to text using OpenAI Whisper API
 * @param {string} filePath - Path to audio file
 * @returns {Promise<string>} - Transcribed text
 */
exports.transcribe = async (filePath) => {
  try {
    logger.info(`Transcribing file: ${filePath}`);
    
    // Create a readable stream from the file
    const fileStream = fs.createReadStream(filePath);
    
    // Call OpenAI Whisper API
    const response = await openai.audio.transcriptions.create({
      file: fileStream,
      model: 'whisper-1',
      language: 'en',
    });
    
    logger.info('Transcription completed successfully');
    
    return response.text;
  } catch (error) {
    logger.error(`Transcription service error: ${error.message}`);
    throw new Error(`Failed to transcribe audio: ${error.message}`);
  }
};