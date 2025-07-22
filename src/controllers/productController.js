const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.addProducts = async (req, res) => {
  console.log("req body : ", req.body);
  const { name, sku, price, images, description, category, features, colors } =
    req.body;
  const product = new Product({
    name,
    sku: "fdsfd",
    price,
    images,
    description,
    reviews: 0,
    rating: 0,
    category,
    features,
    colors,
  });
  console.log("product name: ", name);
  if (
    typeof name !== "string" ||
    name.trim() === "" ||
    typeof price !== "string" ||
    price.trim() === "" ||
    !Array.isArray(images) ||
    images.length === 0 ||
    typeof description !== "string" ||
    description.trim() === "" ||
    typeof category !== "string" ||
    category.trim() === ""
  ) {
    res.status(400).json({ message: "Please fill all the fields" });
    return;
  }
  await product.save();
  res.status(201).json(product);
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
exports.updateProduct = async (req, res) => {
  const { name, price, image, description, category, rating } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.image = image || product.image;
    product.description = description || product.description;
    product.category = category || product.category;
    product.rating = rating || product.rating;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
