const userModel = require('../models/userModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

// export = el metodo o la clase(donde yo lo llame va hacer el proseso)hago un funcion getalluser
//user find es mi peticion
exports.getAllUsers = (req, res) => {
  userModel
    .find() //llamarlos
    .then(users => res.status(201).json(users)) //user cree parametro para guardar informacion
    .catch(err => res.status(500).json({ message: 'An error has ocurred.', err }))
}
exports.getUser = (req, res) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado' })
  }

  const token = authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ message: 'Token invalido' })
  }
  const { id } = decodedToken
  userModel
    .findById(id) //llamarlos
    .then(user => res.status(201).json(user)) //user cree parametro para guardar informacion
    .catch(err => res.status(500).json({ message: 'An error has ocurred.', err }))
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await userModel.findOne({ email })
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' })
  }
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Contraseña incorrecta' })
  }

  const payloadToken = {
    userName: user.userName,
    email: user.email,
    id: user._id,
  }

  const expiresIn = {
    expiresIn: '24h',
  }

  const token = jwt.sign(payloadToken, config.jwt.secret, expiresIn)
  res.status(200).json({ token })
}

exports.createUser = async (req, res) => {
  const { userName, lastname, cellphone, email, password } = req.body
  const userExist = await userModel.findOne({ email: email }) // lo que quiero encontrar primero(email) y cual email quiero que me encuentra (email(cualquiera)) valor que llega
  if (userExist) {
    res.status(409).json({ error: `usuario ya existe` }) //conflicto //mesaje en el postman y poder trabajar en el fromsaber que sucede
    /*  throw new Error("el usuario ya existe") */
  } else {
    //para que no cree dos veces el usuario se mete dentro de un else (2;44)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModel({
      userName,
      lastname,
      cellphone,
      email,
      password: hashedPassword,
    })
    const userSave = await newUser.save()
    console.log(userSave)
    res.status(201).json({ userSave, success: `created` })
  }
  /*   userModel.findOne({email:email}).then((user)=>{

      if(user){
          console.log(user, "este usuario existe");
        throw new Error("el usuario ya existe")
      }
      const newUser = new userModel({
        userName,
        email,
        password,
      })
       newUser.save()
        .then(() => res.status(201).json({ success: `created` }))
        .catch(err =>
          res.status(500).json({ message: 'An error has ocurred.', err })
        )
  })  */
  //propiedad email y que busque email de arriba
  /* res.send({success: `created ${newUser}`}) */
}
exports.updateUser = (req, res) => {
  // const { id } = req.params
  const { authorization } = req.headers
  const { userName, lastname, cellphone } = req.body //desestructurar

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado' })
  }

  const token = authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ message: 'Token invalido' })
  }

  const { id } = decodedToken

  userModel
    .findByIdAndUpdate(id, { userName, lastname, cellphone }, { new: true }) //metodo mongose
    .then(user => {
      if (!user) throw new Error(`user with id ${id} not found`)
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({ message: 'An error has ocurred.', err }))
}
exports.deleteUser = (req, res) => {
  const { authorization } = req.headers
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso denegado' })
  }

  const token = authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ message: 'Token invalido' })
  }

  const { id } = decodedToken
  userModel
    .findByIdAndDelete(id)
    .then(user => {
      console.log(user, 'User')
      if (!user) throw new Error(`user with id ${id} not found`)
      res.status(200).json({ message: 'user deleted' })
    })
    .catch(err => res.status(500).json({ message: 'An error has ocurred.', err }))
}

//throw new Error () =lanzar una alerta de error (error personalizado)
