const express = require('express');
const router = express.Router();
const Review = require('../models/review');

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('userId', 'email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:gameId', async (req, res) => {
  try {
    const reviews = await Review.find({ gameId: req.params.gameId }).populate('userId', 'email');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { userId, gameId, content, rating } = req.body;

  try {
    const review = new Review({ userId, gameId, content, rating });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
