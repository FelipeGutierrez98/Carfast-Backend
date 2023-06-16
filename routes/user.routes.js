// crear una parte con los rutas de los datos
const express = require('express')
const router = express.Router() //especifico que voy a usar de la libreria

//main archivo principal

const usercontroller = require('../controllers/user.controller')
const contactController = require('../controllers/contact.controller')

/* (ruta de partida , metodo que vamos a utilizar) */
router.get('/getusers/', usercontroller.getAllUsers)
router.post('/users/login', usercontroller.loginUser)
router.get('/users/get', usercontroller.getUser)
router.post('/users/', usercontroller.createUser)
router.put('/users/update', usercontroller.updateUser)
router.delete('/users/delete', usercontroller.deleteUser)
router.post('/users/contact', contactController.sendEmail)
// "/" punto de partida

module.exports = router
