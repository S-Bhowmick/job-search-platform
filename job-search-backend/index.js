// index.js (main entry point of your server)
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes'); // Import job routes
const authRoutes = require('./routes/authRoutes'); // Import auth routes

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Use the routes
app.use('/api', jobRoutes);  // Use job-related routes under /api/jobs
app.use('/auth', authRoutes); // Use auth-related routes under /auth

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('Job Search API is running...');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));