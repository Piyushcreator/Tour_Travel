import {TourModel} from '../models/Tour.js'
import {ReviewModel} from '../models/Review.js'

export const createReview = async(req,res)=>{

   
    try {
        const tourId= req.params.tourId
        const newReview= new ReviewModel({...req.body});
      //  console.log(newReview);
        const savedReview=await newReview.save();
        //update review in tour table now

        await TourModel.findByIdAndUpdate(tourId,{$push:{reviews:savedReview._id}})
        if(savedReview){
            res.status(200).json({success:true,message:"Review Submitted", data:savedReview});
        }
        else{
            res.status(200).json({success:false,message:"Failed to sumbit!"});
        }
    } catch (error) {
        res.status(500).json({success: false, message: "Internal Error, Try again!", data:error});
    }
}