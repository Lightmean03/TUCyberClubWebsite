const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./routes/db');
require('dotenv').config();


const app = express();
const port = 9000;
connectDB();



const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, max-age=0');
  next();
});

app.use(express.json());
app.use(cors(corsOptions));


// Serve the React app
app.use(express.static(path.join(__dirname, 'build')));

// Import and use route files
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const calendar = require('./routes/Calendar');
const dashboard = require('./routes/dashboard');
const verifyTokenAndRole = require('./controllers/VerifyTokenAndRoles');


app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);
app.use('/calendar', calendar);
app.use('/dashboard', dashboard);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
