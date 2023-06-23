const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    maxActions: Number
  },
  { versionKey: false }
);

const User = mongoose.model('user', userSchema, 'Users');

module.exports = User;
