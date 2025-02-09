const orderItems = require("../models/orderItems");
const User = require("../models/User");

exports.get_All_Pending_Reviewed = async (req , res) => {
    try {
        const responce = await orderItems.find({
            status : { $in: ["pending", "reviewed"] }  
        })

        res.status(200).json({
            success:true,
            data:responce,
            message: "pending and reviewed fetched successfully for admin"
        })
    } catch (error) {
        return res.send({
            success:false,
            message: "pending and reviewed fetched unsuccessfully for admin"
        })
    }
}

exports.get_Admin_dispatch= async (req , res) => {
    try {
        const responce = await orderItems.find({
            status : { $in: ["dispatched"] }  
        })

        res.status(200).json({
            success:true,
            data:responce,
            message: "dispatch items fetched successfully for admin"
        })
    } catch (error) {
        return res.send({
            success:false,
            message: "dispatch items fetched unsuccessfully for admin"
        })
    }
}

exports.get_Admin_delivered = async (req , res) => {
    try {
        const responce = await orderItems.find({
            status : { $in: ["delivered"] }  
        })

        res.status(200).json({
            success:true,
            data:responce,
            message: "delivered items fetched successfully for admin"
        })
    } catch (error) {
        return res.send({
            success:false,
            message: "delivered items fetched unsuccessfully admin"
        })
    }
}



exports.mark_reviewed = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({   success:false,message: "Order ID is required" });
    }

    // Update the order item status to 'reviewed'
    const updatedOrder = await orderItems.findByIdAndUpdate(
      orderId,
      { status: "reviewed" },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({  success:false, message: "Order item not found" });
    }

    res.status(200).json({
        success:true ,
        message: "Order status updated", 
        order: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({  success:false, message: "Internal server error" });
  }
};

exports.mark_Dispatched = async (req, res) => {
    try {
      const { orderId } = req.body;
  
      if (!orderId) {
        return res.status(400).json({  success:false, message: "Order ID is required" });
      }
  
      // Update the order item status to 'reviewed'
      const updatedOrder = await orderItems.findByIdAndUpdate(
        orderId,
        { status: "dispatched" },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({   success:false,message: "Order item not found" });
      }
  
      res.status(200).json({
          success:true ,
          message: "Order status updated", 
          order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: "Internal server error" });
    }
  };

  exports.mark_Delivered = async (req, res) => {
    try {
      const { orderId } = req.body;
  
      if (!orderId) {
        return res.status(400).json({success:false, message: "Order ID is required" });
      }
  
      // Update the order item status to 'reviewed'
      const updatedOrder = await orderItems.findByIdAndUpdate(
        orderId,
        { status: "delivered" },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({success:false, message: "Order item not found" });
      }
  
      res.status(200).json({
          success:true ,
          message: "Order status updated", 
          order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: "Internal server error" });
    }
  };


  exports.mark_Pending = async (req, res) => {
    try {
      const { orderId } = req.body;
  
      if (!orderId) {
        return res.status(400).json({success:false, message: "Order ID is required" });
      }
  
      // Update the order item status to 'reviewed'
      const updatedOrder = await orderItems.findByIdAndUpdate(
        orderId,
        { status: "pending" },
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({success:false, message: "Order item not found" });
      }
  
      res.status(200).json({
          success:true ,
          message: "Order status updated", 
          order: updatedOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({success:false, message: "Internal server error" });
    }
  };