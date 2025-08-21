const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors")
const cookieParser = require('cookie-parser');
const connectDB = require("./src/config/db");


const app = express();
connectDB();
dotenv.config();
const port = process.env.PORT || 4001;
app.use(cors(
  {
    origin: process.env.FRONTEND_URI, // Next.js frontend port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }
))
console.log(`CORS enabled for ${process.env.FRONTEND_URI}`);
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
