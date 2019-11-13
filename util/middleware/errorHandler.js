const boom = require('@hapi/boom');
const { config } = require('../../config');

function withErrorStack(error, stack) {
  if(config.dev) {
    return { ...error, stack };
  }

  return error;
}

function wrapError(error, req, res, next) {
  if(!error.isBoom) {
    next(boom.badImplementation(error));
  }

  next(error);
}

function logError(error, req, res, next) {
  console.log(error);
  next(error);
}

function errorHandler(error, req, res, next) {
  const { output: { statusCode, payload }} = error;

  res.status(statusCode || 500);
  res.json(withErrorStack(payload, error.stack));
}

module.exports = {
  logError,
  wrapError,
  errorHandler
}