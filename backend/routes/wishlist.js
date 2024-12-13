const express = require("express");
const Wishlist = require("../models/Wishlist");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  const userId = req.user.userId;
  try {
    const wishlist = await Wishlist.findOne({ userId }).populate(
      "games.gameId"
    );
    res.status(200).json(wishlist || { games: [] });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const userId = req.user.userId;
  const { gameId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, games: [] });
    }

    const existingGame = wishlist.games.find((game) =>
      game.gameId.equals(gameId)
    );
    if (existingGame) {
      return res.status(400).json({ message: "Game already in wishlist" });
    }

    wishlist.games.push({ gameId });
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding game to wishlist", error: err.message });
  }
});

router.delete("/:gameId", async (req, res) => {
  const userId = req.user.userId;
  const { gameId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist)
      return res.status(404).json({ message: "Wishlist not found" });

    wishlist.games = wishlist.games.filter(
      (game) => !game.gameId.equals(gameId)
    );
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({
      message: "Error removing game from wishlist",
      error: err.message,
    });
  }
});

module.exports = router;
