const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  feature_image: { type: String, required: false },
  comments: [
    {
      user_id: { type: String, required: true },
      content: { type: String, required: true },
      created_at: { type: Date, default: Date.now },
    },
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
