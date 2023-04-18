import "dotenv/config";
import { connect } from "mongoose";

async function dbConnect(): Promise<void>{
    const DB_URI = <string>process.env.DB_URI;
    try{
    await connect(DB_URI)
    console.log("DB-Online ✅" )
}catch(error){
    console.warn(error, "DB-Connection Error✖️")
}
}

export default dbConnect;