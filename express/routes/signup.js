const express = require('express');
const router = express.Router();
const User = require('../Database/User');

router.post('./signup', async (req, res) => {
  try {
    const { submitter_email, submitter_password } = req.body;
    // Create a new user in the MongoDB database
    const user = await User.create({ submitter_email, submitter_password });
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;