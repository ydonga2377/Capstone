const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  transactionDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending",
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
