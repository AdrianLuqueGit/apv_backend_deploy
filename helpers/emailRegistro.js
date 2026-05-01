import nodemailer from "nodemailer";


const emailRegistro = async (datos) =>{

 var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const {nombre, email, token } = datos;

const info = await transport.sendMail({
    from: `APV - App de veterinaria y gestion pacientes <poissom.jam@gmail.com>`,
    to: email,
    subject: 'compruebe su correo',
    text: 'cumpruebe su correo',
    html: `<p>Hola ${nombre}, vamos a confirmar tu cuenta<p/>
           <p> Pincha en el siguiente enlace <a href="${process.env.FRONTEND_URL}/confirmar/${token}">confirmar<a/> <p/>
    
    `
})
 console.log("MENSAJE enviado: %s" , info.messageId)
};

export default emailRegistro;