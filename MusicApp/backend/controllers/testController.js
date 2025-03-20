const logger = require('../utils/logger');

/**
 * Test API connection
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.testConnection = (req, res) => {
  logger.info('Test connection endpoint called');
  
  res.status(200).json({
    success: true,
    message: 'Backend server is running correctly',
    timestamp: new Date().toISOString()
  });
};