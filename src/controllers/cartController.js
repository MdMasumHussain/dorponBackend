const cart = require("../models/cart");

const addToCart = async (req, res) => {
  const userId = req.user._id; // Get the user ID from the request object
  const {productId, quantity } = req.body;
  try {
    let cartItem = await cart.findOne({ userId, "products.productId": productId });
    if (cartItem) {
      cartItem.products.forEach((item) => {
        if (item.productId.toString() === productId) {
          item.quantity += 1;
        }
      });
      await cartItem.save();
    } else {
      const newCart = new cart({
        userId,
        products: [{ productId, quantity: quantity }],
      });
      await newCart.save();
    }
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCartByUserId = async (req, res) => {
  const userId = req.user.id;
  console.log("User ID:", userId); // Log the userId for debugging
  try {
    const cartItem = await cart.find({ userId })
    if (!cartItem) {
      return res.status(404).json({ message: "Cart not found" });
      console.log("Cart not found for user:", userId);
    }
    res.status(200).json(cartItem);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cartItem = await cart.findOne({ userId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cartItem.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cartItem.products.splice(productIndex, 1);
    await cartItem.save();
    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cartItem = await cart.findOne({ userId });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cartItem.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    cartItem.products[productIndex].quantity = quantity;
    await cartItem.save();
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// =====> Eta very important <=====
module.exports = {
  addToCart,
  getCartByUserId,
  removeFromCart,
  updateCart
};
