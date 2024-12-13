const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Create a new comment
router.post('/', async (req, res) => {
  try {
    const { blog_post_id, user_id, content } = req.body;

    const newComment = new Comment({
      blog_post_id,
      user_id,
      content,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating comment', error: err });
  }
});

// Get comments for a specific blog post
router.get('/:blog_post_id', async (req, res) => {
  try {
    const comments = await Comment.find({ blog_post_id: req.params.blog_post_id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching comments', error: err });
  }
});

module.exports = router;
