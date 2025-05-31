const {NOT_FOUND_STATUS_CODE} = require('./StatusCodes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS_CODE;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;