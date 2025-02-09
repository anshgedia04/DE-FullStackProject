const forgotTemplet = require("../mail/templates/forgotTemplet");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

exports.resetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        if(!email) {
            return res.send({
                success: false,
                message: "Email is required"
            })
        }
        const user = await User.findOne({email});
        if(!user) {
            return res.send({
                success: false,
                message: "User not found"
            })
        }
        //send password to main
        try{
            await mailSender(email, "Password Reset", forgotTemplet(user.password));
            res.status(200).json({
                success: true,
                message: "Password sent to your email"
            })
        }
        catch(err){
            console.log("error in sending mail in reset pass",err.message);   
        }
        
    } catch (error) {
        console.log("error in resetting password",error.message);
    }
}