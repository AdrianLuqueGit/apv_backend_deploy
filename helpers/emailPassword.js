import nodemailer from "nodemailer";


const emailPassword = async (datos) =>{

 var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const {nombre, email, token } = datos;

const info = await transport.sendMail({
    from: 'APV - App de veterinaria y gestion pacientes',
    to: email,
    subject: 'Recupera tu password',
    text: 'Recupera tu password',
    html: `<p>Hola ${nombre}, vamos a recuperar tu password<p/>
           <p> Pincha en el siguiente enlace <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Recuperar<a/> <p/>
    
    `
})
 console.log("MENSAJE enviado: %s" , info.messageId)
};

export default emailPassword;