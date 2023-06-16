const mongoose = require('mongoose')
const config = require('./config')

function connectDB() {
  mongoose.connect(config.db.url).then(() => {
    console.log('conectado')
  })

  /* mongoose.connect("mongodb://127.0.0.1:27017/carro").then(()=>{console.log("conectado");}) //localmente db */
}
module.exports = connectDB
