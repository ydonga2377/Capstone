const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  blog_post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
  user_id: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Comment', commentSchema);
