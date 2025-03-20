const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const logger = require('../utils/logger');
const config = require('../utils/config');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY
});

/**
 * Generate an image based on text prompt using OpenAI DALL-E API
 * @param {string} prompt - Text prompt for image generation
 * @returns {Promise<string>} - URL of the generated image
 */
exports.generateImage = async (prompt) => {
  try {
    logger.info(`Generating image with prompt: "${prompt}"`);
    
    // Call OpenAI DALL-E API
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1, // Number of images to generate
      size: "1024x1024", // Image size
      quality: "standard",
      response_format: "url"
    });
    
    const imageUrl = response.data[0].url;
    
    // Option 1: Return the URL directly (if using OpenAI's hosted URLs)
    if (config.USE_OPENAI_URLS) {
      logger.info('Using OpenAI hosted URL for image');
      return imageUrl;
    }
    
    // Option 2: Download and save the image locally, then return local URL
    const imageName = `album-${Date.now()}.png`;
    const imagePath = path.join(__dirname, '../uploads', imageName);
    
    // Download the image
    const imageResponse = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream'
    });
    
    // Save to local filesystem
    const writer = fs.createWriteStream(imagePath);
    imageResponse.data.pipe(writer);
    
    // Return a promise that resolves when the image is saved
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        logger.info(`Image saved to ${imagePath}`);
        // Return the URL to access the image on our server
        const localUrl = `${config.SERVER_URL}/uploads/${imageName}`;
        resolve(localUrl);
      });
      writer.on('error', reject);
    });
    
  } catch (error) {
    logger.error(`Image generation service error: ${error.message}`);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
};

// Alternative implementation using Stability AI's API if preferred
exports.generateImageWithStabilityAI = async (prompt) => {
  try {
    logger.info(`Generating image with Stability AI: "${prompt}"`);
    
    const response = await axios({
      method: 'POST',
      url: 'https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${config.STABILITY_API_KEY}`
      },
      data: {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      }
    });
    
    // Save image and return URL (similar to above implementation)
    // Code would be similar to the DALL-E implementation
    
    return 'Image URL from Stability AI';
  } catch (error) {
    logger.error(`Stability AI service error: ${error.message}`);
    throw new Error(`Failed to generate image with Stability AI: ${error.message}`);
  }
};