const errorHandler = (err, req, res) => {
  // Log error using a proper logging service
  // console.error(err.stack);

  // Handle celebrate validation errors
  if (err.name === 'ValidationError' && err.isJoi) {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.details.map(detail => detail.message)
    });
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: err.errors
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format'
    });
  }

  if (err.name === 'NotFoundError') {
    return res.status(404).json({
      message: err.message || 'Resource not found'
    });
  }

  // Default to 500 server error
  return res.status(500).json({
    message: 'An unexpected error occurred'
  });
};

module.exports = errorHandler;