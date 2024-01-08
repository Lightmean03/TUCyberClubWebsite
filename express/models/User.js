const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Token",
    },
  ],
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
