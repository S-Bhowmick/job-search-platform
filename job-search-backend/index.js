// job-search-backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON bodies

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure code
  });

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Job Search API is running...');
});

// Handle errors on listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(`Error starting server on port ${PORT}:`, err);
        return process.exit(1); // Exit process with failure code
    }
    console.log(`Server running on port ${PORT}`);
});