const mongoose = require("mongoose");

// admin email address list


const userSchema = new mongoose.Schema({

	firstName: {
		type: String,
		required: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	accountType: {
		type: String,
		enum: ["Admin", "User"],
		default: "User",
	  },	  
	email: {
		type: String,
		required: true,
		trim: true,
	},
	
	password: {
		type: String,
		required: true,
	},
    address : {
        type: String,
		required: true,
    },
    cart : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartItems",
    }] ,
    contactNumber:{
        type: String,
		required: true,
    },
	image:{
		type:String
	},
	order: [{
		type: mongoose.Schema.Types.ObjectId,
        ref: "orderItems",
	}]
})

module.exports = mongoose.model("user", userSchema);