import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import conexionDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js"


const app = express();
app.use(express.json());

dotenv.config();

conexionDB();

const dominiosPermitidos = ["http://localhost:5173"];

const corsOptions = {
    origin: function (origin, callback){
        if(!origin || dominiosPermitidos.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('dominio no permitido'))
        }
    }

}




app.use(cors(corsOptions));
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);



const PORT = process.env.PORT || 4000;


app.listen(PORT, ()=>{
    console.log(`conectado en el puerto ${PORT}`)
})