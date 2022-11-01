const express = require('express')
const router = express.Router()
const { gatewayS } = require('../services')
const {
  protectAuth,
  checkApiName,
  checkEndPoints,
  notExistLoadbalancer,
} = require('../middlewares')

router.all(
  '/:apiName/:endpoint',
  protectAuth,
  checkApiName,
  checkEndPoints,
  notExistLoadbalancer,
  gatewayS
)

module.exports = router
