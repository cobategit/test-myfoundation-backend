const asyncCatch = require('../utils/asyncCatch')
const dotenv = require('dotenv')
const configS = require('../services/config')
const fs = require('fs')
const direct = require('path')
dotenv.config()

const checkApiName = asyncCatch((req, res, next) => {
  const service = configS.services[req.params.apiName]

  if (!service) {
    return res.status(401).json({
      response_code: '090',
      message: 'API name doesnt exist',
    })
  }

  next()
})

const checkEndPoints = asyncCatch((req, res, next) => {
  const service = configS.services[req.params.apiName]
  const findPath = service.endpoints.find(
    (el) => el.name === req.params.endpoint
  )
  if (!findPath) {
    return res.status(401).json({
      response_code: '090',
      message: 'API endpoints name doesnt exist',
    })
  }

  req.query.authentication = findPath.authentication

  next()
})

const notExistLoadbalancer = asyncCatch((req, res, next) => {
  const service = configS.services[req.params.apiName]

  if (!service.loadBalancerStrategy) {
    service.loadBalancerStrategy = 'ROUND_ROBIN'
    fs.writeFileSync(
      direct.join(__dirname, '../services/config.js'),
      JSON.stringify(configS)
    )
    next()
  }

  next()
})

const protectAuth = asyncCatch(async (req, res, next) => {
  let token
  if (req.headers['x-api-key']) {
    try {
      token = req.headers['x-api-key']

      const decoded = new Buffer.from(token, 'base64')

      if (decoded != process.env.API_KEY) {
        return res.status(401).json({
          response_code: '091',
          message: 'Not Authorizated Api Gateway, token failed',
        })
      }

      next()
    } catch (error) {
      return res.status(401).json({
        response_code: '091',
        message: 'Not Authorizated Api Gateway, token failed',
      })
    }
  }

  if (!token) {
    return res.status(401).json({
      response_code: '091',
      message: 'Not Authorizated Api Gateway, token failed',
    })
  }
})

module.exports = {
  protectAuth,
  checkApiName,
  checkEndPoints,
  notExistLoadbalancer,
}
