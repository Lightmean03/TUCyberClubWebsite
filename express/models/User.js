const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

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
  
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema, "users");
module.exports = User;
