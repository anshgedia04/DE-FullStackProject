const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    title : {
        type:String,
        require:true
    },
    price: {
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
    
})

module.exports = mongoose.model("cartItems", cartSchema);