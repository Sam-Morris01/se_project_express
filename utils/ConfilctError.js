const {CONFLICT_STATUS_CODE} = require('./StatusCodes');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT_STATUS_CODE;
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;