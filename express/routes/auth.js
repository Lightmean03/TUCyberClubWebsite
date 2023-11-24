require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('./db');
const { ObjectId } = require('mongodb');
const router = express.Router();
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET_KEY;
const verifyTokenAndRole = require("../controllers/VerifyTokenAndRoles");

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

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
      const user = await db.collection("users").findOne({ email: email });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
          return res.status(401).json({ error: 'Incorrect Password' });
      }

      const payload = {
          name: user.name,
          email: user.email,
          role: user.role,
          UserId: user._id,  
      };

      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

      const refreshToken = jwt.sign({ UserId: user._id }, secretKey, { expiresIn: '7d' });
      console.log('Refresh token:', refreshToken)

      // Store the refresh token in the database
      await db.collection("users").updateOne({ email: email }, { $set: { refreshToken: refreshToken } });

      res.cookie('token', token, {
          httpOnly: true, secure: false, sameSite: 'strict', maxAge: 3600000, path: '/',
      });

      res.cookie('refreshToken', refreshToken, {
          httpOnly: true, secure: false, sameSite: 'strict', maxAge: 604800000, path: '/',
      });

      res.status(200).json({ token: token, user: payload, message: 'User signed in successfully' });

      console.log("User: " + payload.UserId);
  } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ error: 'Failed to sign in' });
  }
});


router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Verify the refresh token
    const user = await db.collection('users').findOne({ refreshToken: refreshToken });

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { email: user.email, role: user.role },
      secretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ message: 'Token refresh failed' });
  }
});



router.get('/admin', verifyTokenAndRole, async (req, res) => {
  try {
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/users/:role', async (req, res) => {
  try {
    const users = await db.collection('users').find({role: req.params.role}).toArray();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/signout', async (req, res) => {
  res.clearCookie('token');
  res.clearCookie('user');

  res.status(200).json({ message: 'User signed out successfully' });
});


module.exports = router;