const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})
module.exports = mongoose.model('User', userSchema) //coleccion de base de base de datos en el futuro
//Colección user dentro de modelos

//En user la creamos parámetro (va a guardar la información hay )
