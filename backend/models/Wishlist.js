const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  games: [
    {
      gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MarketplaceItem",
        required: true,
      },
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
