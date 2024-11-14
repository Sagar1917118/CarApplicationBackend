const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const {dbConnect}=require("./config/database");
require('dotenv').config();
const app=express();
app.use(cors({
    origin:[`http://localhost:5173`],
    credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
dbConnect();
const carRouter=require("./routes/carRouter");
const userRoutes=require("./routes/userRoutes");
app.use('/api/cars/',carRouter);
app.use("/api/auth/user",userRoutes);
app.get("/",(req,res)=>{
    return res.send("Welcome to my backend Page");
});
app.listen(process.env.BACKEND_PORT, () =>{
    console.log("Server is started successfully on port", process.env.BACKEND_PORT);
})