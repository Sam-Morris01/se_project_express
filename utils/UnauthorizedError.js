const {UNAUTHORIZED_STATUS_CODE} = require('./StatusCodes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS_CODE;
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;