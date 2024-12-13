// In your backend, in routes/blogRoutes.js or wherever you have the routes
const express = require('express');
const BlogPost = require('../models/BlogPost');
const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find();  // Fetch all blog posts
    res.json(posts);  // Return the blog posts as JSON
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    res.status(500).send({ message: 'Server error' });
  }
});
router.get('/:id', async (req, res) => {
    try {
      const blogPost = await BlogPost.findById(req.params.id); // No need to populate
      if (!blogPost) {
        return res.status(404).send({ message: 'Blog post not found' });
      }
      res.json(blogPost); // Return the blog post with comments included
    } catch (err) {
      console.error('Error fetching blog post:', err);
      res.status(500).send({ message: 'Server error' });
    }
  });
  
  // Add a comment to a blog post
router.post('/:id/comment', async (req, res) => {
    try {
      const { user_id, content } = req.body; // The comment content and user_id will be passed in the request body
      const blogPost = await BlogPost.findById(req.params.id); // Find the blog post by ID
  
      if (!blogPost) {
        return res.status(404).send({ message: 'Blog post not found' });
      }
  
      // Push the new comment to the comments array
      blogPost.comments.push({ user_id, content });
      await blogPost.save(); // Save the blog post with the new comment
  
      res.status(200).json(blogPost); // Return the updated blog post
    } catch (err) {
      console.error('Error adding comment:', err);
      res.status(500).send({ message: 'Server error' });
    }
  });
  

module.exports = router;
