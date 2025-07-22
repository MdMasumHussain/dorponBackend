const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = () => {

    mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(()=> console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB connectioin error :", err))
 
  }
module.exports = connectDB;
