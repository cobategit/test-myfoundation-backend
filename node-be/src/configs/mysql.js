const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')
dotenv.config()

module.exports = new Sequelize(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_USER_NAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST_NAME,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 6000000,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
)
