import veterinario from "../models/Veterinarios.js";
import generarJWT from "../helpers/generadorJWT.js";
import generarId from "../helpers/generadorID.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailPassword from "../helpers/emailPassword.js";



const registrar = async (req, res)=>{

   const {nombre, email, password} = req.body
   const usuarioExistente = await veterinario.findOne({email});

   if(usuarioExistente){
    const error = new Error('usuario ya existe');
    return res.status(400).json({msg:error.message})
   }

try {
    const veterinarioU = new veterinario(req.body);
    console.log(veterinarioU)
    const veterinarioGuardado = await veterinarioU.save();
    console.log(veterinarioGuardado.token)
    //ENVIO DE MAIL CONFIRMACION
   emailRegistro({
        nombre, 
        email,
        token: veterinarioU.token
    })
    

    res.json(veterinarioGuardado);
    
    
} catch (error) {
    console.log('error en guardado')
    console.log(error)
    process.exit(1)
}

    
};

const perfil = (req, res)=>{
  //  const {veterinario} = req;
    console.log('respuesta en reqveterinario', req.veterinarioUser)
    res.json(req.veterinarioUser);
};

const confirmar = async (req, res)=>{
    const {token} = req.params;
    const usuarioConfirmar = await veterinario.findOne({token});

    if(!usuarioConfirmar){
        const error = new Error('token no valido');
        return res.status(404).json({msg:error.message});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        
    } catch (error) {
        console.log(error)
    }
    res.json({msg:"confirmando perfil"})
}


const autenticar = async (req,res)=>{
    const {email, password} = req.body;
    // buscar si existe user para login
    const usuario = await veterinario.findOne({email});
    if(!usuario){
        const error = new Error('usuario no existe');
        return res.status(403).json({msg: error.message})
    }

    if(!usuario.confirmado){
        const error = new Error('usuario no confirmado');
        return res.status(403).json({msg: error.message})
    }

    if(await usuario.comprobarPassword(password)){
        console.log('hasta aqui bien')
        
       return res.json({
           _id: usuario._id,
           nombre: usuario.nombre,
           email: usuario.email,
           token: generarJWT(usuario._id)
       })
    }else{
        const error = new Error('Password incorrecto');
        return res.status(401).json({msg: error.message})
    }

    
}

const forgotPassword = async (req, res)=>{
    
    const {email} = req.body;

    const existeVet = await veterinario.findOne({email});
    if(!existeVet){
        const error = new Error('no existe usuario');
        return res.status(400).json({msg: error.message})
    }

    try {
        existeVet.token = generarId();
        await existeVet.save();

        emailPassword({
            email,
            nombre: existeVet.nombre,
            token: existeVet.token
        });

        return res.json({msg: 'hemos enviado un mail con instrucciones'})
        
    } catch (error) {
        console.log(error)
    }

    
};

const comprobarToken = async (req, res)=>{
    const {token} = req.params;
    const existeVet = await veterinario.findOne({token});
    if(existeVet){
        res.json({msg: 'usario existe, token valido'})
    }else{
        const error = new Error('usuario no existe, token no valido');
        return res.status(400).json({msg: error.message})
    }
};

const nuevoPassword = async (req, res)=>{
    const {token} = req.params;
    const {password} = req.body;

    const exiteVeterinario = await veterinario.findOne({token});
    if(!exiteVeterinario){
        const error = new Error('no se pudo actualizar password');
        return res.status(400).json({msg: error.message})
    }

    try {
        exiteVeterinario.token = null;
        exiteVeterinario.password = password;
        await exiteVeterinario.save();
        res.json({msg: 'password actualizado'})
        
    } catch (error) {
        console.log(error)
    }
};


export {registrar, perfil, confirmar, autenticar, forgotPassword, comprobarToken, nuevoPassword}

