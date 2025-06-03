const errorHandler = (err, req, res, next) => {
  // Log error using a proper logging service
  // console.error(err.stack);

  // Get status code from error or default to 500
  const statusCode = err.statusCode || 500;

  // Handle validation errors (both Joi and Mongoose)
  if (err.name === 'ValidationError') {
    return res.status(statusCode).json({
      message: 'Validation Error',
      errors: err.isJoi ? err.details.map(detail => detail.message) : err.errors
    });
  }

  // Handle other errors based on status code
  return res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred'
  });
};

module.exports = errorHandler;