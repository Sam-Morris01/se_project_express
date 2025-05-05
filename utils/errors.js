

const {
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
  SERVER_ERROR_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
} = require('./StatusCodes');

const BadRequestError = require('./BadRequestError');
const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConfilctError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  BadRequestError,
  NotFoundError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
  SERVER_ERROR_STATUS_CODE,
  CONFLICT_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  FORBIDDEN_STATUS_CODE,
  BAD_REQUEST_STATUS_CODE,
  NOT_FOUND_STATUS_CODE,
};