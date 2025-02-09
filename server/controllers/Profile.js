const User = require("../models/User")
const orderItems = require("../models/orderItems");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/changePasswordTemplet");

exports.getUserData = async (req , res) =>{
    try{
        const {userId} = req.params;

        const user = await User.findById({_id:userId})
        if(!user){
            return res.send({
                message : "can not find user !!",
                success:false 
            })
        }
        res.status(200).json({
            success:true,
            message:"get user data successfull",
            data:user
        })
    }
    catch(error) {
        return res.send({
            message : "error while finding user !!",
            success:false ,
        })        
    }
}

exports.updateProfileData = async (req ,res) => {
    try{
        const {userId} = req.body ;
        const {firstName , lastName , address , contactNumber} = req.body 

        if(!firstName || !lastName || !address || !contactNumber){
            return res.send({
                success:false,
                message:"all fields are required!!"
            })
        }

        const updatedData = await User.findByIdAndUpdate(
            {_id:userId},
            {
                firstName,
                lastName,
                address,
                contactNumber
            })
        if(!updatedData){
            return res.send({
                success:false,
                message:"can not update your data in DB"
            })
        }
        res.status(200).json({
            success:true,
            message:"data updated successfully",
        })

    }
    catch(error){
        return res.status(500).json({   
            success:false,
            message:"error while updating data",
        })
    }

}

exports.changePassword = async (req , res) => {
    try{
        const {userId} = req.body ;
        const {oldPassword , newPassword} = req.body ;
        if(!oldPassword || !newPassword){
            return res.send({
                success:false,
                message:"all fields are required",
            })
        }   
        const user = await User.findById({_id:userId})
        if(!user){
            return res.send({
                success:false,
                message:"user not found",
            })
        }
        if(user.password !== oldPassword){
            return res.send({
                success:false,
                message:"old password is incorrect",
            })
        }
        const updatedPassword = await User.findByIdAndUpdate(
            {_id:userId},
            {
               password:newPassword 
            });
        if(!updatedPassword){
            return res.send({
                success:false,
                message:"can not update password",
            })
        }
        const emailSend = await mailSender(user.email , 'password updated successfully', passwordUpdated(user.email,user.firstName))
        res.status(200).json({
            success:true,
            message:"password updated successfully",
        })
        
    }
    catch(error){

        return res.status(500).json({
            success:false,
            message:"error while changing password",
        })
    }
}

exports.deleteAccount = async (req,res) => {
    try{
        const {userId} = req.body ;
        const user = await User.findById({_id:userId})
        if(!user){
            return res.send({
                success:false,
                message:"user not found",
            })
        }
    const deletedUser = await User.findByIdAndDelete({_id:userId})
        if(!deletedUser){
            return res.send({
                success:false,
                message:"can not delete user",
            })
        }


    const deletedOrder =  await orderItems.deleteMany({userId:userId})
        if(!deletedOrder){
            return res.send({
            success:false,
            message:"can not delete order",
        })
      }
      res.status(200).json({
        success:true,
        message:"user deleted successfully",
      })
    }
    catch(error){
        return res.status(500).json({

            success:false,
            message:"error while deleting account",
        })
    }
}