const {BAD_REQUEST_STATUS_CODE} = require('./StatusCodes');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_STATUS_CODE;
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;