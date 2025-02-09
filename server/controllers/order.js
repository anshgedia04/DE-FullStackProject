const orderItems = require("../models/orderItems");
const User = require("../models/User");

//when user hits checkout on cart it must be saved in order
exports.orderCreate = async (req, res) => {
    try {
        const { cart , total ,userId , name , address , contactNo , email} = req.body;
        // const userId = req.user.id

        if(!cart || !total ){
            return res.send({
                success: false,
                message: "some issue...."
            })
        }
        try {
            const responce = await orderItems.create({
                items:cart,
                userId:userId,
                total:total,
                name:name,
                address: address,
                contactNo:contactNo,
                email: email
            })

            

            const updated_order = await User.findByIdAndUpdate({_id : userId} , {$push : { order : responce._id}} , {new : true}).populate("order").exec();

            res.status(200).json({
                success:true,
                message:"order set and updated also",
                data:updated_order
            })

        } catch (error) {
        return   res.status(200).json({
                success:false,
                message:"order unset",
            })
        }
    }
    catch(error) {
        return   res.status(200).json({
            success:false,
            message:"something went wrong during order creation",
    })
    }
}


exports.deleteOrder = async (req, res) => {
    try {
        const {orderId , userId} = req.body
        
        const order_update = await orderItems.findByIdAndDelete({_id:orderId})

        const updated_order =await  User.findByIdAndUpdate({_id : userId} , {$pull : { order : orderId}} , {new : true}).populate("order").exec();

        res.status(200).json({
            success:true,
            message: "order deleted from user",
            data:updated_order
        })
    } catch (error) {
       return res.status(404).json({
            success:true,
            message: "order not deleted from user",
        })
    }
}
