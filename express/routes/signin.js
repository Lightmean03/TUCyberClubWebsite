const express = require('express');
const router = express.Router();
const User = require('../Database/User');

router.post('/signin', async (req, res) => {
  try {
    const { submitter_email, submitter_password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ submitter_email });

    // If the user does not exist, return an error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the submitted password matches the user's password
    const passwordMatches = await user.comparePassword(submitter_password);

    // If the password does not match, return an error response
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // User is authenticated, return success response
    res.json({ message: 'Sign-in successful' });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
