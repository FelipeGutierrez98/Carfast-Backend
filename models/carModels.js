const mongoose = require('mongoose')
const carSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  kilometraje: {
    type: Number,
    require: true,
  },
  transmision: {
    type: String,
    require: true,
  },
  ciudad: {
    type: String,
    require: true,
  },
})
module.exports = mongoose.model('cars', carSchema)
