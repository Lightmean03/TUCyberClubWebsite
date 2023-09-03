const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  submitter_email: {
    type: String,
    required: true,
    unique: true,
  },
  submitter_password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
