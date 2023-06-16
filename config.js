require('dotenv').config()

const config = {
  port: process.env.PORT || 9000,
  db: {
    url: process.env.MONGO_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
}

module.exports = config
