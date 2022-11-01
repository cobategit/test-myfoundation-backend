const app = require('./app')
const dotenv = require('dotenv')
const cluster = require('cluster')
const process = require('process')
const os = require('os')
dotenv.config()

const cpus = os.cpus
const numCpus = cpus().length

const ENV = process.env
const PORT = ENV.PORT || 3000
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
  server = app.listen(PORT, () => {})
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
