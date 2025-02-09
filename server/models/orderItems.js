const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    items:[],
    name:{
      type:String
    },
    userId: {
      type:String 
    },
    total:{
        type:String
    },
    address: {
      type:String
    },
    status:{
        type: String,
		enum: ["pending","reviewed" ,"dispatched","delivered"],
		default:"pending",
    },
    createdAt: {
      type: String,
      default: () => {
        const now = new Date();
        const dd = String(now.getDate()).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const yyyy = now.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      },
    },
    contactNo : {
      type:String
    },
    email : {
      type:String
    }
})

module.exports = mongoose.model("orderItems", orderSchema);