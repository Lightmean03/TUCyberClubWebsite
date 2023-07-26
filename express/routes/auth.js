require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('./db');
const crypto = require('crypto');
const router = express.Router();
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET_KEY;

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded Payload:', decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// User Signup Route
router.post('/signup', async (req, res) => {
  const { submitter_email, submitter_password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await db.collection('users').findOne({ submitter_email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Check if email and password are not empty
    if (!submitter_email || !submitter_password) {
      return res.status(400).json({ error: 'Email and password must not be empty' });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(submitter_password, salt);

    const newUser = { submitter_email, submitter_password: hashedPassword };
    await db.collection('users').insertOne(newUser);
    
    // Create a default dashboard entry for the new user
    const newDashboardData = { userId: submitter_email, someData: 'Default Data' };
    await db.collection('data').insertOne(newDashboardData);

    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User sign in Route
router.post('/signin', async (req, res) => {
  const { submitter_email, submitter_password } = req.body;

  try {
    const user = await db.collection('users').findOne({ submitter_email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatches = await bcrypt.compare(submitter_password, user.submitter_password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ email: user.submitter_email }, secretKey);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3600000,
      path: '/',
    });

    console.log('User Email:', user.submitter_email);
    console.log('Token:', token);

    res.json({ message:'User signed in', token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Dashboard route
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    console.log('User Email:', req.user.email);

    const dashboardData = await db.collection('data').findOne({ userId: req.user.email });
    console.log('Dashboard Data:', dashboardData);


    if (!dashboardData) {
      return res.status(404).json({ message: 'Dashboard data not found' });
    }

    res.json(dashboardData);
  } catch (error) {
    console.error('Error retrieving dashboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
