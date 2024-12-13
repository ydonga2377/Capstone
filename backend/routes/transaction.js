const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Create a new transaction
router.post("/createTransaction", async (req, res) => {
  const { userId, gameId, amount, paymentMethod } = req.body;

  try {
    const newTransaction = new Transaction({
      userId,
      gameId,
      amount,
      paymentMethod,
      status: "pending",
    });

    await newTransaction.save();
    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating transaction", error: err.message });
  }
});

// Get all transactions
router.get("/getAllTransactions", async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("gameId", "title")
      .populate("userId", "email");
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transactions", error: err.message });
  }
});

// Get transactions by userId
router.get("/getUserTransactions/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.params.userId })
      .populate("gameId", "title")
      .populate("userId", "email");

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found for this user" });
    }

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transactions for user", error: err.message });
  }
});

module.exports = router;
