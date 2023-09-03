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
const verifyTokenAndRole = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded Payload:', decoded);

    req.user = decoded;

    // Check the user's role in the database
    const user = await db.collection('users').findOne({ submitter_email: req.user.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('User Role:', user.role); // Add this line

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Access Forbidden' });
    }

    next();
  } catch (error) {
    console.error('Error decoding token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};


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

    // Set the role to "user" by default
    const newUser = { submitter_email, submitter_password: hashedPassword, role: "user" };
    await db.collection('users').insertOne(newUser);

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
      secure: false,
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

// New route to get all users (requires admin access)
router.get('/admin/users', verifyTokenAndRole, async (req, res) => {
  try {
    const currentUser = await db.collection('users').findOne({ submitter_email: req.user.email });
    if (currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Dashboard List Route for react-admin
router.get('/admin/dashboard', verifyTokenAndRole, async (req, res) => {
  try {
    // Fetch all dashboard data from the database for react-admin list operation
    const dashboardData = await db.collection('data').find().toArray();
    res.json({ data: dashboardData });
  } catch (error) {
    console.error('Error retrieving dashboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Dashboard Update Route for react-admin
router.put('/admin/dashboard/:id', verifyTokenAndRole, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Update the dashboard data in your database based on the ID
    await db.collection('data').updateOne({ _id: ObjectId(id) }, { $set: updatedData });

    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error('Error updating dashboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Dashboard Create Route for react-admin
router.post('/admin/dashboard', verifyTokenAndRole, async (req, res) => {
  try {
    const newData = req.body;

    // Insert the new dashboard data into your database
    await db.collection('data').insertOne(newData);

    res.json({ message: 'Data created successfully' });
  } catch (error) {
    console.error('Error creating dashboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Dashboard Delete Route for react-admin
router.delete('/admin/dashboard/:id', verifyTokenAndRole, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the dashboard data from your database based on the ID
    await db.collection('data').deleteOne({ _id: ObjectId(id) });

    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting dashboard data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token', { path: '/' });
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;