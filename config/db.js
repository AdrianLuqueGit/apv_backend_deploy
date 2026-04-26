import mongoose from "mongoose";

const conexionDB = async () =>{

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        const url = `${db.connection.host}:${db.connection.port}`;
        console.log(`mongoDB conectado a ${url}`);
        
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
        
    }
}

export default conexionDB;