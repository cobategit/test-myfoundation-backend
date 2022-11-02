class AppError extends Error {
  constructor(message, statusCode, code) {
    super(message)

    this.message = message
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('2') ? true : false
    this.code = code
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = AppError
