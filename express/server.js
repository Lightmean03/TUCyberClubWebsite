const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { db, connectDB } = require('./routes/db');
require('dotenv').config();


const app = express();
const port = 9000;
const secretKey = process.env.SECRET_KEY;
connectDB();



const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
};

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, max-age=0');
  next();
});

app.use(express.json());
app.use(cors(corsOptions));

app.use(cookieParser());

// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

// Import and use route files
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');


app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
