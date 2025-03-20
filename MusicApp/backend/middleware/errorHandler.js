const logger = require('../utils/logger');

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error(`Error: ${err.message}`);
  logger.debug(err.stack);

  // Default error status code and message
  let statusCode = 500;
  let message = 'Internal Server Error';
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Resource Not Found';
  } else if (err.code === 'LIMIT_FILE_SIZE') {
    statusCode = 413;
    message = 'File too large';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: message,
    // Only include error stack in development environment
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;