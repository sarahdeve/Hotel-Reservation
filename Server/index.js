import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";


mongoose.connection.on("disconnected", ()=>{
    console.log(`Mongodb disconnected`)
})


const app = express()

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log(`Connected to mongodb`)
    }catch (error) {
        throw error;
    }
}

// mongoose.connection.on("connected", ()=>{
    //     console.log(`Mongodb connected`)
    // })

    app.use(cookieParser())    
    app.use(express.json())
    app.use(cors())

    
    app.use("/auth", authRoute)
    app.use("/users", usersRoute)
    app.use("/hotels", hotelsRoute)
    app.use("/rooms", roomsRoute)
    
    
    
    app.use((err, req, res, next)=> {
        const errorStatus = err.status || 500
        const errorMessage = err.message || "Something went wrong"

        console.log(`Im a middleware`)
        // res.send(`dsmlsdmls`)
        return res.status(errorStatus).json({
            success:false,
            status:errorStatus, 
            message:errorMessage,
            stack: err.stack,
        })
        // next()
    })
 
app.listen(8800, () => {
    connect();
    console.log(`Connected to backend.`)
})