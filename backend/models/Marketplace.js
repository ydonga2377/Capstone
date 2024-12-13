const mongoose = require("mongoose");

const marketplaceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const MarketplaceItem = mongoose.model("MarketplaceItem", marketplaceSchema);

module.exports = MarketplaceItem;
