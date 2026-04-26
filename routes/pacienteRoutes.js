import express from "express";
const route = express.Router();
import checkAuth from "../middleware/authMiddleware.js";

import { agregarPaciente,
         obtenerPacientes,
         obtenerPaciente,
         actualizarPaciente,
         eliminarPaciente
        } from "../controllers/pacienteController.js";


route.route("/")
     .post(checkAuth, agregarPaciente)
     .get(checkAuth, obtenerPacientes);

route.route("/:id")
     .get(checkAuth, obtenerPaciente)
     .put(checkAuth, actualizarPaciente)
     .delete(checkAuth, eliminarPaciente)



export default route; 