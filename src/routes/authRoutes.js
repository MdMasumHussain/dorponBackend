const express = require("express");
const { registerUser, loginUser , getUserProfile, logoutUser} = require("../controllers/authController");


const router = express.Router();

// User Registration
router.post("/register", registerUser);
// User Login
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.get("/logout", logoutUser);



module.exports = router;