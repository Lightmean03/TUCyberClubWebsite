// Import required modules
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const path = require('path');


// Create the Express app
const app = express();
const port = 9000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection setup
const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://trecottman60:Bobby@towsonclub.ja3qb7f.mongodb.net/';
    const dbName = 'TowsonClub';

    const client = new MongoClient(uri, { useUnifiedTopology: true });

    await client.connect();
    const db = client.db(dbName);
    console.log('Connected to MongoDB!');

    // Generate a random secret key for JWT
    const secretKey = crypto.randomBytes(32).toString('hex');

    // User Signup Route
    app.post('/signup', async (req, res) => {
      const { submitter_email, submitter_password } = req.body;

      try {
        // Check if the user already exists in the database
        const existingUser = await db.collection('users').findOne({ submitter_email });
        if (existingUser) {
          return res.status(409).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(submitter_password, 10);

        // Create a new user in the MongoDB database
        const newUser = { submitter_email, submitter_password: hashedPassword };
        await db.collection('users').insertOne(newUser);

        res.json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // User Signin Route
    app.post('/signin', async (req, res) => {
      const { submitter_email, submitter_password } = req.body;

      try {
        // Check if the user exists in the database
        const user = await db.collection('users').findOne({ submitter_email });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        // Compare the submitted password with the hashed password from the database
        const passwordMatches = await bcrypt.compare(submitter_password, user.submitter_password);

        
        if (!passwordMatches) {
          return res.status(401).json({ error: 'Incorrect password' });
        }

        // Generate a JWT token with the user's email as the payload
        const token = jwt.sign({ email: user.submitter_email }, secretKey, { expiresIn: '1h' });

        // User is authenticated, return success response with the token
        res.json({ token });
      } catch (error) {
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

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

    // Dashboard route
    app.get('/dashboard', verifyToken, async (req, res) => {
      try {
        // Retrieve dashboard data from the database based on the user's email
        const dashboardData = await db.collection('dashboard').findOne({ userId: req.user.email });


        if (!dashboardData) {
          return res.status(404).json({ message: 'Dashboard data not found' });
        }

        // Return the dashboard data
        res.json(dashboardData);
      } catch (error) {
        console.error('Error retrieving dashboard data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Serve the React app
    app.use(express.static(path.join(__dirname, 'build')));

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with a non-zero status code
  }
};

// Connect to MongoDB and start the server
connectDB();

// Error handling for uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection:', reason);
  process.exit(1);
});
