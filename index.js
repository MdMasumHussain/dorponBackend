const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const cookieParser = require('cookie-parser');
const connectDB = require("./src/config/db");


const app = express();
connectDB();
dotenv.config();
const port = process.env.PORT || 4001;
// const allowedOrigins = [
//   "https://dorpon-frontend-ngf9.vercel.app",
//   "https://dorpon-frontend-ngf9-pv4m3kdnz-md-masum-hossain-s-projects.vercel.app",
//   "https://dorpon-frontend-ngf9-git-main-md-masum-hossain-s-projects.vercel.app"
// ];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || /vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/products", require("./src/routes/productRouotes"));
app.use("/api/carousel", require("./src/routes/carouselRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/cart", require("./src/routes/cartRoutes"));
app.use("/api/order", require("./src/routes/orderRoutes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
