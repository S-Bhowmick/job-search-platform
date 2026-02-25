const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

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

// Get all job listings
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});

// Get a specific job by ID
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch job' });
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