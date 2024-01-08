const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: String,
  content: String,
  username: {
    type: String,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;
