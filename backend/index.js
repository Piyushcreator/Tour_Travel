import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import TourRoute from './routes/TourRoute.js'
import UserRoute from './routes/UserRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import ReviewRoute from './routes/Review.js'
import BookingRoute from './routes/Booking.js'
import cookieParser from 'cookie-parser'
dotenv.config();

const app=express();
const port= process.env.PORT || 6000
const db=process.env.MONGODB
const base=process.env.URL
const corOptions ={
    origin: 'http://localhost:3000',
    credentials: true, 
}


mongoose.set("strictQuery", false)

const connectDB= async() =>{
try {
    await mongoose.connect(process.env.MONGODB)
    console.log("DB connected successfully!")
    
} catch (error) {
    console.log("DB connection Failed!")
    
}
}

app.use(express.json());
app.use(cors(corOptions));
app.use(cookieParser())
app.use(base+'tour',TourRoute)
app.use(base+'user',UserRoute)
app.use(base+'auth',AuthRoute)
app.use(base+'review',ReviewRoute)
app.use(base+'booking',BookingRoute)

app.listen(port,()=>{
    connectDB();
    console.log("Server Started");
})

app.get("/",(req,res)=>{
    res.send("API is working");
})