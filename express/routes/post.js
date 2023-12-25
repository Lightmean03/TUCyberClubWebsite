const express = require('express');
const { Router } = express;
const router = Router();
const { db, connectDB, } = require('./db');

const Post = require('../models/Post');

router.post('/post', async (req, res) => {
    const { title, content,email } = req.body;
    try {
        const newPost = { title, content, email };
        await db.collection('posts').insertOne(newPost);
        res.json({ message: 'Post created successfully' });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/post/posts', async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const skipCount = (page - 1) * parseInt(limit);
      const posts = await db.collection('posts').find().skip(skipCount).limit(parseInt(limit)).toArray();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

router.get('/posts', async (req, res) => {
    try {
        const posts = await db.collection('posts').find().toArray();
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






module.exports = router;

