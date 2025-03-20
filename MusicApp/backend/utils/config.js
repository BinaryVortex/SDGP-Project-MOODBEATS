// Load environment variables
require('dotenv').config();

// Configuration object with environment variable fallbacks
const config = {
  // Server configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:3000',
  
  // API keys
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  STABILITY_API_KEY: process.env.STABILITY_API_KEY,
  
  // Image generation options
  USE_OPENAI_URLS: process.env.USE_OPENAI_URLS === 'true' || false,
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // File upload limits
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 10 * 1024 * 1024, // 10MB default
};

// Validate required configuration
const requiredConfig = ['OPENAI_API_KEY'];
for (const key of requiredConfig) {
  if (!config[key]) {
    console.error(`Missing required configuration: ${key}`);
    process.exit(1);
  }
}

module.exports = config;