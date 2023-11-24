const express = require('express');
const { Router } = express;
const jwt = require('jsonwebtoken');
const router = Router();
const crypto = require('crypto');
const { db, connectDB, } = require('./db');




const secretKey = process.env.JWT_SECRET_KEY;

// Middleware function for token verification
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Verify the token and decode the payload
      const decoded = jwt.verify(token, secretKey);

      // Attach the decoded payload to the request object
      req.user = decoded;

      next();
    } catch (error) {
      console.error('Error decoding token:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };

  

module.exports = router;
module.exports = verifyToken;
