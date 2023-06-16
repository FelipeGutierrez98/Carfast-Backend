const carModel = require('../models/carModels')

exports.getAllCars = (req, res) => {
  carModel
    .find()
    .then(cars => res.status(200).json(cars))
    .catch(err =>
      res.status(500).json({ message: 'An error has ocurred.', err })
    )
}
exports.getCar = (req, res) => {
  const { id } = req.params
  carModel
    .findById(id)
    .then(car => res.status(200).json(car))
    .catch(err =>
      res.status(500).json({ message: 'An error has ocurred.', err })
    )
}

exports.createCar = (req, res) => {
  const { marca, modelo, precio, age, kilometraje, transmision, ciudad } =
    req.body
  const newCar = new carModel({
    marca,
    modelo,
    precio,
    age,
    kilometraje,
    transmision,
    ciudad,
  })
  newCar
    .save()
    .then(() => res.status(201).json({ success: 'created' }))
    .catch(err =>
      res.status(500).json({ message: 'An error has ocurred.', err })
    )
}

exports.updateCar = (req, res) => {
  const { id } = req.params
  const { marca, modelo, precio, age, kilometraje, transmision, ciudad } =
    req.body
  carModel
    .findByIdAndUpdate(
      id,
      { marca, modelo, precio, age, kilometraje, transmision, ciudad },
      { new: true }
    )
    .then(car => {
      if (!car) throw new Error(`user with ID ${id} not found`)
      res.status(200).json(car)
    })
    .catch(err =>
      res.status(500).json({ message: 'An error has ocurred.', err })
    )
}

exports.deleteCar = (req, res) => {
  const { id } = req.params
  carModel
    .findByIdAndDelete(id)
    .then(car => {
      if (!car) throw new Error(`user with ID ${id} not found`)
      res.status(200).json({ message: 'User deleted' })
    })
    .catch(err =>
      res.status(404).json({ message: 'An error has ocurred.', err })
    )
}
