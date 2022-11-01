const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { logger } = require('./utils/logEvents')
const dotenv = require('dotenv')
const path = require('path')
const rateLimit = require('express-rate-limit')
dotenv.config()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors())
app.use(logger)
app.use(morgan('combined'))

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

const gatewayR = require('./routes/index')
app.use('/api-gateway', limiter, gatewayR)

app.use('/', (req, res, next) => {
  res.status(404)
  if (req.accepts('html')) {
    return res.status(404).sendFile(path.join(__dirname, 'views', 'index.html'))
  } else if (req.accepts('json')) {
    return res.status(404).send('welcome to Api Gateway')
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

module.exports = app
