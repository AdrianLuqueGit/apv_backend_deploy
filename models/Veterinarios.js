import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generadorID.js";

const veterinarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono:{
        type: String,
        default: null,
        trim: true
    },
    web:{
        type: String,
        default: null
    },
    token:{
        type: String,
        default: generarId()

    },
    confirmado:{
        type: Boolean,
        default: false
    }


});

veterinarioSchema.pre('save', async function(){
    // si elpassword ya esta haseado para novolver a hacerlo
  if(this.isModified('password')){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  
})

veterinarioSchema.methods.comprobarPassword = async function(passwordUser){
    console.log('en jwt')
    return await bcrypt.compare(passwordUser, this.password);
}



const veterinario = mongoose.model('veterinario', veterinarioSchema);
export default veterinario;