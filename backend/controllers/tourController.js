import {TourModel} from '../models/Tour.js'

export const createTour= async (req, res) => {
    const newTour= new TourModel(req.body);

    try {
      
        const tour= await TourModel.findOne({  title:req.body.title});
        console.log(tour);
        if(tour){
       res.status(200).json({success: true, message: "Tour is alrady created."});
        }
        else{
    const savedTour= await newTour.save();
    res.status(200).json({success: true, message: "Tour is created successfully", data: savedTour});
        }  
} catch (error) {
    res.status(500).json({success: false, message: "Failed to create, Try again!", data:error});
}
}

export const updateTour= async (req, res) => {

    
    const id= req.params.id;
    try {
        const updateTour= await TourModel.findByIdAndUpdate(id, {$set:req.body},{new:true});
        if(updateTour)
        res.status(200).json({success:true,message:"Successfully Update!", data:updateTour});
        else
        res.status(200).json({success:false,message:"Failed to Update!"});
    } catch (error) {
       res.status(502).json({success:false,message:"Internal Server Error!",error});
    } 
}

export const deleteTour= async (req, res) => {
    const id= req.params.id;

    try {
     await TourModel.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "Tour is Deleted successfully"});
    
} catch (error) {
    res.status(500).json({success: false, message: "Failed to delete, Try again!", data:error});
}
}

export const getAllTour= async (req, res) => {
    const page= parseInt(req.query.page);
    try {
        const tours = await TourModel.find({}).populate('reviews').skip(page*5).limit(5);
        
        if(tours.length>0)
          res.status(200).json({success:true,count:tours.length,message: "Data Found!", data:tours});
        else
         res.status(200).json({success:false,message:"Not Found!"}); 
       } catch (error) {
          res.status(502).json({success:false,message:"Internal Server Error!",error});
       } 
}

export const getSingleTour= async (req, res) => {
    const id= req.params.id;
    try {
      const tour =await TourModel.findById(id).populate('reviews');
      if(tour){
       res.
      status(200)
      .json({
        success:true,
        message: "Data Found",
        data: tour
      });}
      else
       res.status(200).json({success: false,message: "No Data Found!"});
    } catch (error) {
       res.status(502).json({success:false,message:"Internal Server Error!",error});
    } 
}

export const getTourBySearch = async (req,res)=>{
        const city= new RegExp(req.query.city,'i')
        const distance= parseInt(req.query.distance)
        const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        const tours= await TourModel.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')
        if(tours.length>0)
        res.status(200).json({success:true,message: "Data Found!", data:tours});
      else
       res.status(404).json({success:false,message:"Not Found!"}); 

    } catch (error) {
        res.status(502).json({success:false,message:"Internal Server Error!",error});
    }
}

export const getFeaturedTour = async (req,res)=>{

    try {
        const tours= await TourModel.find({featured:true}).populate('reviews').limit(8);
        if(tours.length>0)
        res.status(200).json({success:true,message: "Data Found!", data:tours});
      else
       res.status(404).json({success:false,message:"Not Found!"}); 

    } catch (error) {
        res.status(502).json({success:false,message:"Internal Server Error!",error});
    }
}

export const getTourCount = async (req,res)=>{

    try {
        const tourcount= await TourModel.estimatedDocumentCount();
       
        res.status(200).json({success:true,message: "Data Found!", data:tourcount});

    } catch (error) {
        res.status(502).json({success:false,message:"Internal Server Error!",error});
    }
}