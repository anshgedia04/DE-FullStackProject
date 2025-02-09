const orderItems = require("../models/orderItems");
const User = require("../models/User");

exports.get_pending_reviewed = async (req , res) => {
    try {
        const {userId} = req.params

        const responce = await orderItems.find({userId:userId ,
            status : { $in: ["pending", "reviewed"] }  
        })

        res.status(200).json({
            success:true,
            data:responce,
            message: "pending and reviewed fetched successfully "
        })
    } catch (error) {
        return res.send({
            success:false,
            message: "pending and reviewed fetched unsuccessfully "
        })
    }
}

exports.get_dispatch= async (req , res) => {
    try {
        const {userId} = req.params

        const responce = await orderItems.find({userId:userId ,
            status : { $in: ["dispatched"] }  
        })

        res.status(200).json({
            success:true,
            data:responce,
            message: "dispatch items fetched successfully "
        })
    } catch (error) {
        return res.send({
            success:false,
            message: "dispatch items fetched unsuccessfull"
        })
    }
}

exports.get_delivered = async (req , res) => {
    try {
        const {userId} = req.params

        const responce = await orderItems.find({userId:userId ,
            status : { $in: ["delivered"] }  
        })

        res.status(200).json({
            success:true,
            data:responce,
            message: "delivered items fetched successfully "
        })
    } catch (error) {
        return res.send({
            success:false,
            message: "delivered items fetched unsuccessfull"
        })
    }
}