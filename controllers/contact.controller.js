const nodemailer = require('nodemailer')

exports.sendEmail = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body

    // Configurar el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Servicio de correo electrónico que estás utilizando
      auth: {
        user: process.env.EMAIL, // Tu dirección de correo electrónico
        pass: process.env.PASS_EMAIL, // Tu contraseña de correo electrónico
      },
    })

    // Configurar el contenido del correo electrónico
    const mailOptions = {
      from: process.env.EMAIL, // Tu dirección de correo electrónico
      to: process.env.EMAIL,
      cc: email,
      subject: subject,
      text: `Nombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
    }

    // Enviar el correo electrónico
    await transporter.sendMail(mailOptions)

    // Responder al frontend con una confirmación
    res.status(200).json({ message: 'Correo enviado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al enviar el correo electrónico' })
  }
}