require('dotenv').config()

const ENV = process.env

module.exports = {
  services: {
    auth: {
      index: 0,
      endpoints: [
        {
          name: 'register',
          method: 'post',
          authentication: false,
        },
        {
          name: 'login',
          method: 'post',
          authentication: false,
        },
        {
          name: 'logout',
          method: 'get',
          authentication: true,
        },
      ],
      link: ENV.PATH_LINK,
      instances: [
        {
          name: 'auth',
          host: `${ENV.HOST}`,
          protocol: 'http',
          port: ENV.PORT_AUTH1,
          url: `http://${ENV.HOST}:${ENV.PORT_AUTH1}`,
        },
      ],
      loadBalancerStrategy: 'ROUND_ROBIN',
    },
    products: {
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
          method: 'patch',
          authentication: true,
        },
        {
          name: 'delete',
          method: 'delete',
          authentication: true,
        },
      ],
      link: ENV.PATH_LINK,
      instances: [
        {
          name: 'products',
          host: `${ENV.HOST}`,
          protocol: 'http',
          port: ENV.PORT_PRODUCTS1,
          url: `http://${ENV.HOST}:${ENV.PORT_PRODUCTS1}`,
        },
      ],
      loadBalancerStrategy: 'ROUND_ROBIN',
    },
  },
}
