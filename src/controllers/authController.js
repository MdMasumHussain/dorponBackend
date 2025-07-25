const { protect } = require("../middleware/authMiddleware");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.registerUser = async (req, res) => {
    const {first_name, last_name, email, number, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ first_name, last_name, email, number, password, cart: [] });
    const token = generateToken(user.id);
    res.cookie("token", token, {
        httpOnly: true,
        secure: true, 
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
    res.status(201).json({ 
        _id: user.id, name: user.name, email: user.email, 
        token: token 
    });
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user.id, user.isAdmin);
        console.log("cookies are : ", token);
        // Set token in cookie
    res.setHeader("Cache-Control", "no-store");
    res.cookie("token", token, {
        httpOnly: false,
        secure: true, // Set to true in production
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie valid for 7 days
      });
        res.json({ 
            _id: user.id, name: user.name, email: user.email, 
            token: token 
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
}
exports.getUserProfile = [protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
    
}];
exports.logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 0, // Set the cookie to expire immediately
      });
    res.status(200).json({ message: "Logged out successfully" });
}
exports.updateUserProfile = async (req, res) => {
    const { first_name, last_name, email, number } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        user.first_name = first_name || user.first_name;
        user.last_name = last_name || user.last_name;
        user.email = email || user.email;
        user.number = number || user.number;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            number: updatedUser.number,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
}
