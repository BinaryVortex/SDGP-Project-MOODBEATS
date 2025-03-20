const imageGenerationService = require('../services/imageGenerationService');
const logger = require('../utils/logger');

/**
 * Generate an image based on text prompt
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.generateImage = async (req, res, next) => {
  try {
    // Check if prompt exists in request body
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: 'No prompt provided'
      });
    }

    logger.info(`Generating image for prompt: ${prompt}`);
    
    // Enhance the prompt to specifically target album cover art
    const enhancedPrompt = `Album cover art for a song with the following description: ${prompt}. High quality, professional album artwork.`;
    
    // Call image generation service
    const imageUrl = await imageGenerationService.generateImage(enhancedPrompt);
    
    // Return the image URL
    return res.status(200).json({
      success: true,
      imageUrl
    });
    
  } catch (error) {
    logger.error(`Image generation error: ${error.message}`);
    next(error);
  }
};