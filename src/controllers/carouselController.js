const Carousel = require("../models/Carousel")


exports.getCarousel = async (req, res)=>{
    const carousels = await Carousel.find()
    res.json(carousels)
}

exports.addCarousel = async (req, res)=>{
    const {image} = req.body;
    const product = new Product({image});
    await product.save();
    res.status(201).json(product);
}
