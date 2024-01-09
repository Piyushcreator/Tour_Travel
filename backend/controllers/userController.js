import {UserModel} from '../models/User.js'


export const updateUser= async (req, res) => {

    
    const id= req.params.id;
    try {
        const updateUser= await UserModel.findByIdAndUpdate(id, {$set:req.body},{new:true});
        if(updateUser)
        res.status(200).json({success:true,message:"Successfully Update!", data:updateUser});
        else
        res.status(200).json({success:false,message:"Failed to Update!"});
    } catch (error) {
       res.status(502).json({success:false,message:"Internal Server Error!",error});
    } 
}

export const deleteUser= async (req, res) => {
    const id= req.params.id;

    try {
     await UserModel.findByIdAndDelete(id);
    res.status(200).json({success: true, message: "User is Deleted successfully"});
    
} catch (error) {
    res.status(500).json({success: false, message: "Failed to delete, Try again!", data:error});
}
}

export const getAllUser= async (req, res) => {
    try {
        const Users = await UserModel.find({});
        
        if(Users.length>0)
          res.status(200).json({success:true,count:Users.length,message: "Data Found!", data:Users});
        else
         res.status(200).json({success:false,message:"Not Found!"}); 
       } catch (error) {
          res.status(502).json({success:false,message:"Internal Server Error!",error});
       } 
}

export const getSingleUser= async (req, res) => {
    const id= req.params.id;
    try {
      const User =await UserModel.findById(id);
      if(User){
       res.
      status(200)
      .json({
        success:true,
        message: "Data Found",
        data: User
      });}
      else
       res.status(500).json({success: false,message: "No Data Found!"});
    } catch (error) {
       res.status(502).json({success:false,message:"Internal Server Error!",error});
    } 
}

export const getUserCount = async (req,res)=>{

    try {
        const Usercount= await UserModel.estimatedDocumentCount();
       
        res.status(200).json({success:true,message: "Data Found!", data:Usercount});

    } catch (error) {
        res.status(502).json({success:false,message:"Internal Server Error!",error});
    }
}