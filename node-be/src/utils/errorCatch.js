const AppError = require('./appError')
const { logEvents } = require('./logEvents')
const dotenv = require('dotenv')
dotenv.config()

const handleDuplicateError = (err) => {
  const message = `Duplicate error.`
  return new AppError(message, 400)
}

const errorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.statusCode,
    response_code: err.code,
    message: err.message,
    stack: err.stack,
  })
}

const errorProd = (err, res) => {
  if (err.isOperational) {
    //Operational error, error umum yg kita bikin sendiri
    res.status(err.statusCode).json({
      status: err.statusCode,
      response_code: err.code,
      message: err.message,
    })
  } else {
    //Error Programming
    res.status(500).json({
      status: 'Error',
      message: 'Something when wrong',
    })
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    errorDev(err, res)
  } else if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err }

    if (error.code === 11000) error = handleDuplicateError(error)
    errorProd(error, res)
  }
  logEvents(`\n${err.name}: ${err.message}`, 'errLog.txt ')
}
