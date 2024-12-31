const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cover: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;