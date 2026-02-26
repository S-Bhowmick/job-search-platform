const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');  // Import the job routes
const Job = require('./models/Job');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure code
  });

// Use the jobRoutes for the /jobs path
app.use('/jobs', jobRoutes);

// Basic route to test the server
app.get('/api/jobs', async (req, res) => {
    try {
        const jobs = await Job.find(); // Ensure you are querying the Job model correctly
        res.json(jobs); // Send the job data as JSON
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

app.post('/api/jobs', async (req, res) => {
    const newJob = new Job({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        company: req.body.company,
        salary: req.body.salary,
    });

    try {
        await newJob.save();
        res.status(201).json({ message: "Job created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to create job" });
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));