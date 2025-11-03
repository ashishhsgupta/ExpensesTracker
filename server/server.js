import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import dotenv from "dotenv";
import {connectDatabase} from "./config/database.js";
import routes from "./router/router.js"


dotenv.config({path:"./config/config.env"});

await connectDatabase();

const app = express();
app.use(express.json());

let corsOptions = {
    origin:["http://localhost:5174"],
    methods:["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    Credentials:true,
}

app.use(cors(corsOptions));
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));


// app.get('/',(req,res)=>{
//     res.send('Hello world');
// });

app.use('/', routes);

const PORT = process.env.PORT || 4002;
app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`)
})