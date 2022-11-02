const asyncCatch = require('../utils/asyncCatch')
const ProductModel = require('../products/products.model')
const AppError = require('../utils/appError')

const validateFormAuth = asyncCatch(async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError('Email cannot empty', 400, '111'))
  }

  if (!req.body.password) {
    return next(new AppError('Password cannot empty', 400, '111'))
  }

  next()
})

const validateFormProducts = asyncCatch(async (req, res, next) => {
  if (!req.body.name) {
    return next(new AppError('Name Product cannot empty', 400, '111'))
  }

  if (!req.body.price) {
    return next(new AppError('Price Product cannot empty', 400, '111'))
  }

  next()
})

const validateProductExist = asyncCatch(async (req, res, next) => {
  const find = await ProductModel.findOne({
    where: {
      id: req.query.id,
    },
  })

  if (find == null) {
    return next(new AppError('Product not found', 400, '111'))
  }

  req.product = find

  next()
})

module.exports = {
  validateFormAuth,
  validateFormProducts,
  validateProductExist,
}
