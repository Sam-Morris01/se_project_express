const {FORBIDDEN_STATUS_CODE} = require('./StatusCodes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_STATUS_CODE;
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;