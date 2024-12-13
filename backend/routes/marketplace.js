const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const MarketplaceItem = require("../models/Marketplace");

router.get("/", async (req, res) => {
  try {
    const items = await MarketplaceItem.find().populate(
      "seller",
      "username email"
    );
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    res.status(500).json({ message: "Failed to fetch marketplace items" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { title, description, price, image, category, stock } = req.body;

  if (!title || !price || !image || !category) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const newItem = new MarketplaceItem({
      title,
      description,
      price,
      image,
      category,
      stock,
      seller: req.user.userId,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error adding marketplace item:", error);
    res.status(500).json({ message: "Failed to add item" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await MarketplaceItem.findById(req.params.id).populate(
      "seller",
      "username email"
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Failed to fetch item" });
  }
});

module.exports = router;
