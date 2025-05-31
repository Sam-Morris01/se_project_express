<<<<<<< HEAD
=======
const winston = require('winston');
const expressWinston = require('express-winston');

>>>>>>> origin/main
const winston = require("winston");
const expressWinston = require("express-winston");

const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, meta, timestamp }) =>
<<<<<<< HEAD
      `${timestamp} ${level}: ${meta?.error?.stack || message}`
=======
      `${timestamp} ${level}: ${meta.error?.stack || message}`
>>>>>>> origin/main
  )
);

const requestLogger = expressWinston.logger({
  transports: [
<<<<<<< HEAD
    new winston.transports.Console({ format: messageFormat }),
=======
    new winston.transports.Console({
      format: messageFormat,
    }),
>>>>>>> origin/main
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
<<<<<<< HEAD
  meta: true,
  expressFormat: true,
  colorize: false,
=======
>>>>>>> origin/main
});

const errorLogger = expressWinston.errorLogger({
  transports: [
<<<<<<< HEAD
=======
    new winston.transports.Console({
      format: messageFormat,
    }),
>>>>>>> origin/main
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};