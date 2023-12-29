require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { Router } = express;
const router = Router();
const { db } = require("./db");
const { ObjectId } = require("mongodb");
const secretKey = process.env.JWT_SECRET_KEY;

const Post = require("../models/Post");

router.post("/post", async (req, res) => {
  const username = req.cookies.username;
  const { title, content } = req.body;
  try {
    const newPost = { title, content, username };
    await db.collection("posts").insertOne(newPost);
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
    const posts = await db
      .collection("posts")
      .find()
      .skip(skipCount)
      .limit(parseInt(limit))
      .toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/posts", async (req, res) => {
  try {
    const posts = await db.collection("posts").find().toArray();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete post based on id and Admin role
router.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token;
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - Token missing" });
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await db.collection("users").findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User Role:", user.role);

    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access Forbidden" });
    }

    const postId = new ObjectId(id);
    const collection = db.collection("posts");
    const result = await collection.deleteOne({ _id: postId });
    console.log(result);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
