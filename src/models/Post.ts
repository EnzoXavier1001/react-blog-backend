const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date
  },
  cover: {
    type: String
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;