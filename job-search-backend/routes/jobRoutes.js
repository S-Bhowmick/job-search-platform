// job-search-backend/routes/jobRoutes.js
const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Route to get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find(); // Fetch all jobs from MongoDB
        res.status(200).json(jobs); // Send the jobs as JSON
    } catch (err) {
        res.status(500).json({ message: "Error fetching jobs" });
    }
});
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

// Apply the middleware to protect the POST job route
router.post('/add', authMiddleware, async (req, res) => {
    const newJob = new Job({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        company: req.body.company,
        salary: req.body.salary,
    });

    try {
        const job = await newJob.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create job' });
    }
});

// Add a new job listing
router.post('/add', async (req, res) => {
    const newJob = new Job({
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        company: req.body.company,
        salary: req.body.salary,
    });

    try {
        const job = await newJob.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ message: 'Failed to create job' });
    }
});

router.post('/apply', authMiddleware, async (req, res) => {
    const { jobId, resume, coverLetter } = req.body;

    const application = new Application({
        jobId,
        userId: req.user.id,
        resume,
        coverLetter,
    });

    try {
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to apply for job' });
    }
});

// Route to get all jobs with optional filters
router.get('/jobs', async (req, res) => {
    const { title, location, minSalary, maxSalary } = req.query;

    try {
        let filter = {};

        // Apply filters if provided
        if (title) filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (minSalary) filter.salary = { $gte: minSalary };
        if (maxSalary) filter.salary = { $lte: maxSalary };

        const jobs = await Job.find(filter);
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching jobs" });
    }
});

// Update a job listing
router.put('/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: 'Failed to update job' });
    }
});

// Delete a job listing
router.delete('/:id', async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedJob);
    } catch (err) {
        res.status(400).json({ message: 'Failed to delete job' });
    }
});

module.exports = router;