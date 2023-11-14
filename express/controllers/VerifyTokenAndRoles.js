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
      const user = await db.collection('users').findOne({ email: req.user.email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log('User Role:', user.role);
  
      if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Access Forbidden' });
      }
  
      next();
    } catch (error) {
      console.error('Error decoding token:', error);
      res.status(401).json({ message: 'Unauthorized' });
    }
  };