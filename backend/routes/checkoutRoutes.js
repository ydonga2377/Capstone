
const express = require("express");
const Checkout = require("../models/Checkout"); // Import the Checkout model
const router = express.Router();

// Create a new checkout record
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      items,
      transaction,
      address
    } = req.body;

    // Create a new Checkout record
    const newCheckout = new Checkout({
      userId,
      items,
      transaction,
      address,
    });

    const savedCheckout = await newCheckout.save(); // Save to database
    res.status(201).json(savedCheckout);
  } catch (err) {
    console.error("Error creating checkout:", err);
    res.status(500).json({ error: "Failed to create checkout record", details: err });
  }
});

// Get all checkout records (admin view or debugging purposes)
router.get("/", async (req, res) => {
  try {
    const checkouts = await Checkout.find().populate("userId").populate("items.gameId");
    res.status(200).json(checkouts);
  } catch (err) {
    console.error("Error fetching checkouts:", err);
    res.status(500).json({ error: "Failed to fetch checkouts", details: err });
  }
});

// Get a specific user's checkout history
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const userCheckouts = await Checkout.find({ userId }).populate("items.gameId");
    if (!userCheckouts.length) {
      return res.status(404).json({ error: "No checkout records found for this user" });
    }
    res.status(200).json(userCheckouts);
  } catch (err) {
    console.error("Error fetching user's checkouts:", err);
    res.status(500).json({ error: "Failed to fetch user's checkouts", details: err });
  }
});

// Update checkout status (e.g., refund or admin action)
router.put("/:checkoutId", async (req, res) => {
  try {
    const { checkoutId } = req.params;
    const updates = req.body;

    const updatedCheckout = await Checkout.findByIdAndUpdate(
      checkoutId,
      { $set: updates },
      { new: true }
    );
    if (!updatedCheckout) {
      return res.status(404).json({ error: "Checkout record not found" });
    }
    res.status(200).json(updatedCheckout);
  } catch (err) {
    console.error("Error updating checkout:", err);
    res.status(500).json({ error: "Failed to update checkout record", details: err });
  }
});

// Delete a checkout record (admin or testing purposes)
router.delete("/:checkoutId", async (req, res) => {
  try {
    const { checkoutId } = req.params;

    const deletedCheckout = await Checkout.findByIdAndDelete(checkoutId);
    if (!deletedCheckout) {
      return res.status(404).json({ error: "Checkout record not found" });
    }
    res.status(200).json({ message: "Checkout record deleted successfully" });
  } catch (err) {
    console.error("Error deleting checkout:", err);
    res.status(500).json({ error: "Failed to delete checkout record", details: err });
  }
});

module.exports = router;