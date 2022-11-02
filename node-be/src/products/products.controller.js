const asyncCatch = require('../utils/asyncCatch')
const ProductModel = require('../products/products.model')
const AppError = require('../utils/appError')
const mysql = require('../configs/mysql')
const { Op } = require('sequelize')
const { format } = require('date-fns')
const { getPagination, getPagingData } = require('../utils/pagination')

const create = asyncCatch(async (req, res, next) => {
  const transaction = await mysql.transaction()

  try {
    const data = {
      ...req.body,
      created_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    }

    const insert = await ProductModel.create(data, {
      transaction: transaction,
    })

    await transaction.commit()

    res.status(201).json({
      success: true,
      message: 'Created product success',
      response_code: '000',
      product: {
        id: insert.id,
        ...data,
      },
    })
  } catch (error) {
    await transaction.rollback()
    return next(
      new AppError(`Failed Created Product Function - ${error}`, 400, '111')
    )
  }
})

const list = asyncCatch(async (req, res, next) => {
  const { page, size, name, price_less, price_high } = req.query

  const { limit, offset } = getPagination(page, size, 50)

  let whereProduct = {},
    listProduct

  try {
    if (name) {
      whereProduct.name = {
        [Op.like]: `%${name}%`,
      }
    }

    if (price_less && price_high) {
      whereProduct.price = {
        [Op.between]: [price_less, price_high],
      }
    } else if (price_less) {
      whereProduct.price = {
        [Op.gte]: price_less,
      }
    } else if (price_high) {
      whereProduct.price = {
        [Op.lte]: price_high,
      }
    }

    listProduct = await ProductModel.findAndCountAll({
      where: whereProduct,
      limit,
      offset,
      order: [['created_at', 'DESC']],
    })

    const { totalItems, row, totalPages, currentPage } = getPagingData(
      listProduct,
      page,
      limit
    )

    res.status(200).json({
      success: true,
      message: 'Data found',
      response_code: '000',
      countProduct: row.length,
      totalItems,
      currentPage,
      totalPages,
      products: row,
    })
  } catch (error) {
    return next(
      new AppError(`Failed List Product Function - ${error}`, 400, '111')
    )
  }
})

const detail = asyncCatch(async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Data found',
      response_code: '000',
      product: req.product,
    })
  } catch (error) {
    return next(
      new AppError(`Failed Detail Product Function - ${error}`, 400, '111')
    )
  }
})

const update = asyncCatch(async (req, res, next) => {
  const transaction = await mysql.transaction()

  try {
    const data = {
      ...req.body,
      updated_at: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    }

    await ProductModel.update(data, {
      where: {
        id: req.query.id,
      },
      transaction: transaction,
    })

    await transaction.commit()

    res.status(200).json({
      success: true,
      message: 'Update product success',
      response_code: '000',
    })
  } catch (error) {
    await transaction.rollback()
    return next(
      new AppError(`Failed Updated Product Function - ${error}`, 400, '111')
    )
  }
})

const deleted = asyncCatch(async (req, res, next) => {
  const transaction = await mysql.transaction()

  try {
    await ProductModel.destroy({
      where: {
        id: req.query.id,
      },
      transaction: transaction,
    })

    await transaction.commit()

    res.status(200).json({
      success: true,
      message: 'Deleted product success',
      response_code: '000',
    })
  } catch (error) {
    await transaction.rollback()
    return next(
      new AppError(`Failed Deleted Product Function - ${error}`, 400, '111')
    )
  }
})

module.exports = {
  create,
  list,
  detail,
  update,
  deleted,
}
