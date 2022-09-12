/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

function logErrors(err, req, res, next) {
  console.error(err)
  next(err)
}

function errorHandler(err, req, res, next) {
  res.status(500).send({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  }

  next(err)
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
