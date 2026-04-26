import paciente from "../models/Pacientes.js";

const agregarPaciente = async (req, res)=>{
    const pacienteNuevo = new paciente(req.body);
    pacienteNuevo.veterinario = req.veterinarioUser._id;

    try {
        
        const pacienteGuardado = await pacienteNuevo.save();
        res.json(pacienteGuardado)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'hubo un error en el controller'})
    }

}

const obtenerPacientes = async (req, res)=>{
    const pacientes = await paciente.find().where('veterinario').equals(req.veterinarioUser);
    res.json(pacientes)
    
}

const obtenerPaciente = async (req, res) =>{
    const {id} = req.params;
    const pacienteGuardado = await paciente.findById(id);

    if(pacienteGuardado.veterinario.toString() !== req.veterinarioUser._id.toString()){
        const error = new Error('datos no coinciden')
        return res.json({msg: error.message})
    }
    if(paciente){
        res.json(pacienteGuardado);
    }
};

const actualizarPaciente = async (req, res) =>{
    const {id} = req.params;
    const pacienteGuardado = await paciente.findById(id);

    if(!pacienteGuardado){
        res.status(400).json({msg:'no hay paciente'})
    }
     if(pacienteGuardado.veterinario.toString() !== req.veterinarioUser._id.toString()){
        const error = new Error('datos no coinciden')
        return res.json({msg: error.message})
    }
    //actualizar paciente 

        pacienteGuardado.nombre = req.body.nombre || pacienteGuardado.nombre;
        pacienteGuardado.propietario = req.body.propietario || pacienteGuardado.propietario;
        pacienteGuardado.email = req.body.email || pacienteGuardado.email;
        pacienteGuardado.fecha = req.body.fecha || pacienteGuardado.fecha;
        pacienteGuardado.sintomas = req.body.sintomas || pacienteGuardado.sintomas;

        try {
           const pacienteActualizado = await pacienteGuardado.save();
           res.json(pacienteActualizado)
        } catch (error) {
            console.log(error)
        }
    

};

const eliminarPaciente = async (req, res) =>{

    const {id} = req.params;
    const pacienteGuardado = await paciente.findById(id);

    if(!pacienteGuardado){
        res.status(400).json({msg:'no hay paciente'})
    }
     if(pacienteGuardado.veterinario.toString() !== req.veterinarioUser._id.toString()){
        const error = new Error('datos no coinciden')
        return res.json({msg: error.message})
    }
    //eliminar un paciente
    try {
        await pacienteGuardado.deleteOne();
        res.json({msg:'paciente eliminado'})
    } catch (error) {
        console.log(error)
    }
};

export {agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente};