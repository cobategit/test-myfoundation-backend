const asyncCatch = require('../utils/asyncCatch')
const configS = require('./config')
const axios = require('axios')
const loadBalancer = require('../utils/loadBalancer')

const gatewayS = asyncCatch(async (req, res, next) => {
  const service = configS.services[req.params.apiName]
  const newIndex = loadBalancer[service.loadBalancerStrategy](service)
  const url = service.instances[newIndex].url
  const link = service.link
  let configAxios = {}

  configAxios.method = req.method
  configAxios.url = url + link + req.originalUrl.replace('/api-gateway', '')

  if (req.method == 'GET') {
    configAxios.headers = req.query.authentication
      ? {
          Accept: '*/*',
          Authorization: req.headers.authorization,
        }
      : {
          Accept: '*/*',
        }
  } else {
    configAxios.headers = req.query.authentication
      ? {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization,
          Accept: '*/*',
        }
      : {
          'Content-Type': 'application/json',
          Accept: '*/*',
        }
    configAxios.data = req.body
  }

  try {
    const dataS = await axios(configAxios)

    res.status(dataS.status).json(dataS.data)
  } catch (error) {
    res.status(500).json({
      response_code: '111',
      message: error,
    })
  }
})

module.exports = { gatewayS }
