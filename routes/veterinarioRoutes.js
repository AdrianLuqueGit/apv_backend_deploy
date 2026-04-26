import express from "express";
const router = express.Router();
import {registrar, 
        perfil, 
        confirmar, 
        autenticar, 
        forgotPassword,
        comprobarToken,
        nuevoPassword} from "../controllers/veterinarioController.js"
import checkAuth from "../middleware/authMiddleware.js";

router.post("/", registrar );

router.get("/perfil",checkAuth, perfil );

router.get("/confirmar/:token", confirmar );

router.post("/login", autenticar);

router.post("/forgot-Password", forgotPassword);
router.get("/forgot-Password/:token", comprobarToken);
router.post("/forgot-Password/:token", nuevoPassword);








export default router;