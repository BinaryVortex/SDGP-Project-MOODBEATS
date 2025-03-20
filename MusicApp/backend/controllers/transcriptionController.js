const fs = require('fs');
const transcriptionService = require('../services/transcriptionService');
const logger = require('../utils/logger');

/**
 * Transcribe audio file to text
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.transcribeAudio = async (req, res, next) => {
  try {
    // Check if file exists in request
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No audio file provided'
      });
    }

    logger.info(`Transcribing audio file: ${req.file.path}`);
    
    // Get file path from multer
    const audioFilePath = req.file.path;
    
    // Call transcription service
    const transcription = await transcriptionService.transcribe(audioFilePath);
    
    // Delete the temporary file after transcription
    fs.unlink(audioFilePath, (err) => {
      if (err) {
        logger.error(`Error deleting temporary file: ${err.message}`);
      }
    });
    
    // Return the transcription
    return res.status(200).json({
      success: true,
      text: transcription
    });
    
  } catch (error) {
    logger.error(`Transcription error: ${error.message}`);
    next(error);
  }
};