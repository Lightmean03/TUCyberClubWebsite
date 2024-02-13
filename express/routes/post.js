require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { Router } = express;
const router = Router();
const User = require("../models/User");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const decodeToken = require("../middlewares/auth/decodeToken");

router.post("/post", decodeToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const username = req.userId;

    const newPost = new Post({
      title,
      content,
      id: new mongoose.Types.ObjectId(),
      username: username,
    });

    await newPost.save();

    res.json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/post/posts", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skipCount = (page - 1) * parseInt(limit);

    // Fetch posts with username information
    const posts = await db
      .collection("posts")
      .find()
      .skip(skipCount)
      .limit(parseInt(limit))
      .toArray();

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete post based on id and Admin role
router.delete("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const { userEmail } = req.body;
    const user = await User.findOne({ userEmail });
    console.log("user", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User Role:", user.role);

    if (user.role === "admin") {
      return res.status(200).json({ message: "Access Granted" });
    }

    if (user.role === "user") {
      return res
        .status(403)
        .json({ error: "Access Forbidden, Users cant delete posts" });
    }

    const result = await Post.findByIdAndDelete(postId);
    console.log(result);

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
