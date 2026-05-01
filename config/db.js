import mongoose from "mongoose";

const conexionDB = async () =>{

    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        const url = `${db.connection.host}:${db.connection.port}`;
        const dbName = db.connection.name;
        console.log(`mongoDB conectado a ${url}, bbdd es : ${dbName}`);
        
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
        
    }
}

export default conexionDB;