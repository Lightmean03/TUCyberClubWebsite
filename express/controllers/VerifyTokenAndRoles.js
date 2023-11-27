// Middleware to verify the JWT token
const { db } = require('../routes/db');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;


const verifyTokenAndRole = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, secretKey);
      console.log('Decoded Payload:', decoded);
  
      req.user = decoded;
  
      // Check the user's role in the database
      const user = await db.collection('users').findOne({ email: req.user.email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log(decoded);
      if (user.role === "admin") {
        return res.status(200).json({ error: 'Access Given' });
      }else{
        return res.status(403).json({ error: 'Access Forbidden' });
      }
      } catch (error) {
      console.error('Error decoding token:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };

  

  module.exports = verifyTokenAndRole;
