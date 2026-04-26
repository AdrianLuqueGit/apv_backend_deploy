import jwt from "jsonwebtoken";
import veterinario from "../models/Veterinarios.js";


const checkAuth = async (req, res, next)=>{
    let token;
    console.log(req.headers.authorization)
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
           token = req.headers.authorization.split(' ')[1];
           const decode = jwt.verify(token, process.env.JWT_SECRET)
           
           req.veterinarioUser = await veterinario.findById(decode.id).select("-password");
            
        } catch (error) {
            const e = new Error('token erroneo');
            res.status(403).json({msg: e.message});
        }
        return next();
    }

    if(!token){
       const error = new Error('No tiene token');
       res.status(403).json({msg: error.message});
    }

    

    next();
    
}

export default checkAuth;