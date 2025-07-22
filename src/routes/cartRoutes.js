const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getCartByUserId, addToCart, removeFromCart, updateCart } = require("../controllers/cartController");



const router = express.Router();

router.get("/", protect, getCartByUserId);
router.post("/", protect, addToCart);
router.delete("/", protect, removeFromCart);
router.put("/", protect, updateCart);

module.exports = router;
