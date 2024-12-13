const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  blog_post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', required: true },
});

module.exports = mongoose.model('Category', categorySchema);
