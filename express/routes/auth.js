require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('./db');
const { ObjectId } = require('mongodb');
const router = express.Router();
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET_KEY;
const  verifyTokenAndRole = require('../controllers/VerifyTokenAndRoles');


router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Check if email and password are not empty
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password must not be empty' });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set the role to "user" by default
    const newUser = { email, password: hashedPassword, role: "user", userId: new ObjectId };
    await db.collection('users').insertOne(newUser);

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// User sign in Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ email: user.email }, secretKey);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600000,
      path: '/',
    });

    console.log('User Email:', user.email);
    console.log('Token:', token);

    res.json({ message:'User signed in', token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//New route to get all users (requires admin access)
router.get('/admin/users', async (req, res) => {
  try {
    const currentUser = await db.collection('users').findOne({ email: req.user.email });
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }else if(currentUser.role === 'admin'){
      const users = await db.collection('users').findOne({ email: req.user.email });
      res.json(users);
    }else{
      return res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.status(200).json({ message: 'Logged out successfully' });
});



module.exports = router;