const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const path = require('path')
const asyncCatch = require('../utils/asyncCatch')
const logEvents = require('../utils/logEvents')
const UserModel = require('../auth/auth.model')
const AppError = require('../utils/appError')

const reqBearerTkn = asyncCatch(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const { email } = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      )

      req.user = await UserModel.findOne({
        where: {
          email,
          token,
        },
      })

      if (req.user == null) {
        return next(new AppError('Token not found', 401, '111'))
      }

      next()
    } catch (error) {
      logEvents(
        `${req.method}\t${req.headers.origin}\t${req.url}\nerror reqBearerTkn - ${error}`,
        'auth.middleware.txt',
        path.join(__dirname, '../logs'),
        path.join(__dirname, '../logs', 'auth.middleware.txt')
      )
      return next(
        new AppError(
          `Not Authentication - email not found or token failed - ${error}`,
          401,
          '111'
        )
      )
    }
  }

  if (!token) {
    return next(new AppError(`Not Authentication, no token`, 401, '111'))
  }
})

module.exports = {
  reqBearerTkn,
}
