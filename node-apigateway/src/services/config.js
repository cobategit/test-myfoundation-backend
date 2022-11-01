require('dotenv').config()

const ENV = process.env

module.exports = {
  services: {
    campaign: {
      index: 0,
      endpoints: [
        {
          name: 'create',
          method: 'post',
          authentication: true,
        },
        {
          name: 'list',
          method: 'get',
          authentication: true,
        },
        {
          name: 'detail',
          method: 'get',
          authentication: true,
        },
        {
          name: 'update',
          method: 'put',
          authentication: true,
        },
        {
          name: 'delete',
          method: 'delete',
          authentication: true,
        },
      ],
      link: '/api/v1',
      instances: [
        {
          name: 'campaign',
          host: `${ENV.HOST}`,
          protocol: 'http',
          port: ENV.PORT_CAMPAIGN,
          url: `http://${ENV.HOST}:${ENV.PORT_CAMPAIGN1}`,
        },
      ],
      loadBalancerStrategy: 'ROUND_ROBIN',
    },
  },
}
