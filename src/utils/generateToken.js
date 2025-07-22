const jwt = require("jsonwebtoken");

const generateToken = (userId, isAdmin) => {
    return jwt.sign({ id: userId, isAdmin: isAdmin }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = generateToken;
