const express = require("express");
const cartController = require("../controllers/cartController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Add item to cart (user_id comes from token)
router.post("/add", protect, cartController.addToCart);

// Get cart items of logged-in user
router.get("/", protect, cartController.getCart);

// Remove a single item
router.delete("/remove/:id", protect, cartController.removeItem);

// Clear full cart of logged-in user
router.delete("/clear", protect, cartController.clearCart);

module.exports = router;
