import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes/task";
import morgan from "morgan";
import db from './config/mongo';


const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan("dev"))

app.use("/task", router )
db();

app.listen(PORT, ()=>{
    console.log(`Server running on Port ${PORT}`);
    
})