const express = require("express");
const router = express.Router()

const {login,signup,sendotp, contactUs} = require("../controllers/Auth");
const { resetPassword } = require("../controllers/ResetPassword");
const { getUserData, updateProfileData, changePassword, deleteAccount } = require("../controllers/Profile");


// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signup)

// Route for sending OTP to the user's email
router.post("/sendotp", sendotp)

//know your password
router.post("/resetpassword", resetPassword);

router.post('/contactus', contactUs);

//profile routes
router.get('/profileData/:userId', getUserData);
router.put('/profileUpdate', updateProfileData);
router.put('/changePassword', changePassword);
router.delete('/deleteAccount', deleteAccount);

module.exports = router

