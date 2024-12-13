const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  const userId = req.user.userId;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.gameId");
    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const userId = req.user.userId;
  const { gameId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.gameId.equals(gameId));
    if (existingItem) {
      return res.status(400).json({ message: "Item already in cart" });
    }

    cart.items.push({ gameId });
    await cart.save();

    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:gameId", async (req, res) => {
  const userId = req.user.userId;
  const { gameId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => !item.gameId.equals(gameId));
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
