const express = require("express")
const { getCarousel, addCarousel } = require("../controllers/carouselController")

const router = express.Router()

router.get("/", getCarousel)
router.post("/", addCarousel)

module.exports = router;