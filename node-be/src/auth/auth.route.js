const express = require('express')
const { register, login } = require('../auth/auth.controller')
const { validateFormAuth } = require('../middlewares/validate.middleware')
const routerAuth = express.Router()

routerAuth.use(validateFormAuth)
routerAuth.route('/register').post(register)
routerAuth.route('/login').post(login)

module.exports = routerAuth
