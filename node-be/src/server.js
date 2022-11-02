const app = require('./app')
const connectMysql = require('./configs/mysql')
const dotenv = require('dotenv')
const cluster = require('cluster')
const process = require('process')
const os = require('os')
dotenv.config()

const ENV = process.env
const PORT = ENV.PORT || 4004

connectMysql
  .authenticate()
  .then(() =>
    console.log(`database connected ${connectMysql['config']['database']}`)
  )
  .catch((err) => console.log(`error: ${err}`))

const cpus = os.cpus
const numCpus = cpus().length
let server

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`)
  for (let index = 0; index < numCpus; index++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {
  server = app.listen(PORT, () =>
    console.log(`server api gateway running on port ${PORT}`)
  )
  console.log(`Worker ${process.pid} started`)
}

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION !! Mematikan server...')
  console.log('server down: ', err)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err) => {
  console.log('UNHANDLED REJECTION !! Mematikan server...')
  console.log('server down: ', err)
  server.close(() => {
    process.exit(1)
  })
})
