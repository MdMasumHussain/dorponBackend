const express = require("express")
const { getProducts, addProducts, getProductById } = require("../controllers/productController")

const router = express.Router()

router.get("/", getProducts)
router.post("/", addProducts)
router.get("/pages/product/:id", getProductById)

module.exports = router;