const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET)
}

module.exports = { generateJwt }
