const asyncCatch = require('../utils/asyncCatch')
const AppError = require('../utils/appError')
const { format } = require('date-fns')
const { generateJwt } = require('../utils/jwtToken')
const UserModel = require('./auth.model')
const bcrypt = require('bcryptjs')
const mysql = require('../configs/mysql')

const register = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body

  const checkUser = await UserModel.findOne({
    where: { email: email },
  })

  if (checkUser) {
    return next(new AppError('Email exists', 400, '111'))
  }

  const transaction = await mysql.transaction()

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const data = {
      email,
      password: hashedPass,
      created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    }

    await UserModel.create(data, {
      transaction: transaction,
    })

    await transaction.commit()

    res.status(201).json({
      success: true,
      message: 'Registered Success',
      response_code: '000',
    })
  } catch (error) {
    await transaction.rollback()
    return next(
      new AppError(`Failed Registered Function - ${error}`, 400, '111')
    )
  }
})

const login = asyncCatch(async (req, res, next) => {
  const { email, password } = req.body

  try {
    const checkUser = await UserModel.findOne({
      where: { email: email },
    })

    if (checkUser == null) {
      return next(new AppError('Data not found', 400, '111'))
    }

    if (!(await bcrypt.compare(password, checkUser.password))) {
      return next(new AppError('Password incorrect', 400, '111'))
    }

    let token = generateJwt(checkUser.id, checkUser.email, '30d')

    await UserModel.update(
      {
        token,
      },
      {
        where: { email },
      }
    )

    res.status(200).json({
      success: true,
      message: 'Data found',
      response_code: '000',
      token,
      user: {
        id: checkUser.id,
        email: checkUser.email,
      },
    })
  } catch (error) {
    return next(new AppError(`Failed Login Function - ${error}`, 400, '111'))
  }
})

const logout = asyncCatch(async (req, res, next) => {
  try {
    const checkUser = await UserModel.findOne({
      where: { email: req.user.email },
    })

    if (checkUser == null) {
      return next(new AppError('Data not found', 400, '111'))
    }

    await UserModel.update(
      {
        token: null,
      },
      {
        where: { email: req.user.email },
      }
    )

    res.status(200).json({
      success: true,
      message: 'Logout Success',
      response_code: '000',
    })
  } catch (error) {
    return next(new AppError(`Failed Logout Function - ${error}`, 400, '111'))
  }
})

module.exports = {
  register,
  login,
  logout,
}
