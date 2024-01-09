
import {ReviewModel} from '../models/Review.js'
import { BookingModel } from '../models/Booking.js';

export const createBooking = async(req,res)=>{

   
    try {
        const newBooking= new BookingModel(req.body);
        const savedBooking=await newBooking.save();
        if(savedBooking){
            res.status(200).json({success:true,message:"Your Tour is booked.", data:savedBooking});
        }
        else{
            res.status(500).json({success:false,message:"Failed to sumbit!"});
        }
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Error, Try again!", data:error});
    }
}

export const getBooking = async ( req,res)=>{
    const id= req.params.id
    try {
        const book = await BookingModel.findById(id);
        if(book){
            res.status(200).json({success:true,message: "Data Found!", data:book});
        }
        else{
            res.status(404).json({success: false,message: "No Data Found!"});
        }
    } catch (error) {
        res.status(502).json({success: false, message: "Internal Error, Try again!", data:error});
    }
}
export const getAllBooking = async ( req,res)=>{
    try {
        const books = await BookingModel.find({});
        if(books.length>0){
            res.status(200).json({success:true,message: "Data Found!", data:books});
        }
        else{
            res.status(404).json({success: false,message: "No Data Found!"});
        }
    } catch (error) {
        res.status(502).json({success: false, message: "Internal Error, Try again!", data:error});
    }
}