const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv')
const path = require('path')
const { logger } = require('./utils/logEvents')
const errorCatch = require('./utils/errorCatch')
dotenv.config()
const app = express()
const ENV = process.env
const urlPath = ENV.URL_PATH || '/api/v1'

if (ENV.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('combined'))
}

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('trust proxy', 1)
app.use(logger)

const authRoute = require('./auth/auth.route')
const productsRoute = require('./products/produts.route')

app.use(urlPath + '/auth', authRoute)
app.use(urlPath + '/products', productsRoute)

app.use(urlPath + '/', (req, res, next) => {
  res.status(404)
  if (req.accepts('html')) {
    return res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'))
  } else if (req.accepts('json')) {
    return res.status(404).send('welcome to REST-API')
  } else {
    res.type('txt').send('404 not found')
  }
})

app.all('*', (req, res, next) => {
  res.status(404)
  if (req.accepts('html')) {
    return res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    return res.status(404).send(`cant't find ${req.originalUrl} on this site`)
  }
})

app.use(errorCatch)

module.exports = app
