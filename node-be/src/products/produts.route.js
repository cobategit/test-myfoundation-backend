const express = require('express')
const {
  validateFormProducts,
  validateProductExist,
} = require('../middlewares/validate.middleware')
const {
  create,
  list,
  detail,
  update,
  deleted,
} = require('../products/products.controller')
const { reqBearerTkn } = require('../middlewares/auth.middleware')
const routerProducts = express.Router()

routerProducts.use(reqBearerTkn)
routerProducts.route('/list').get(list)
routerProducts.route('/create').post(validateFormProducts, create)
routerProducts.route('/detail').get(validateProductExist, detail)
routerProducts.route('/update').patch(validateProductExist, update)
routerProducts.route('/delete').delete(validateProductExist, deleted)

module.exports = routerProducts
