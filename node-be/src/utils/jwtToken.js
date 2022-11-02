const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generateJwt = (id, email, expired) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: expired,
  })
}

module.exports = { generateJwt }
