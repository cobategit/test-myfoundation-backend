const express = require('express')
const { register, login, logout } = require('../auth/auth.controller')
const { reqBearerTkn } = require('../middlewares/auth.middleware')
const { validateFormAuth } = require('../middlewares/validate.middleware')
const routerAuth = express.Router()

routerAuth.route('/logout').get(reqBearerTkn, logout)
routerAuth.use(validateFormAuth)
routerAuth.route('/register').post(register)
routerAuth.route('/login').post(login)

module.exports = routerAuth
