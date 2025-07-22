const express = require('express');
const router = express.Router();
const { addOrder, getOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');


router.post('/', protect, addOrder);
router.get('/', protect, getOrders);

module.exports = router;