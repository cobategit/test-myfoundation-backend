const { format } = require('date-fns')
const { v4: uuid } = require('uuid')

const fs = require('fs')
const fsPromise = require('fs').promises
const path = require('path')

const logEvents = async (msg, logName) => {
  const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
  const logData = `\n${dateTime}\t${uuid()}\t${msg}`
  try {
    if (!fs.existsSync(path.join(__dirname, '../logs'))) {
      await fsPromise.mkdir(path.join(__dirname, '../logs'))
    }
    await fsPromise.appendFile(
      path.join(__dirname, '../logs', logName),
      logData
    )
  } catch (error) {
    console.log(error)
  }
}

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
  next()
}

module.exports = { logger, logEvents }
