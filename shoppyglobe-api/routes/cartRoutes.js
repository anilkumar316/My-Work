const express = require('express');
const router = express.Router();
const { addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addToCart);
router.put('/:id', authMiddleware, updateCartItem);
router.delete('/:id', authMiddleware, removeFromCart);

module.exports = router;
