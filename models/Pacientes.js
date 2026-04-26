import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    propietario:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true,
        default: Date.now()
    },
    sintomas:{
        type: String,
        required: true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "veterinario"
    }

});

const paciente = mongoose.model("paciente", pacienteSchema);

export default paciente;