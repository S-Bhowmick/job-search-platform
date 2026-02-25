const mongoose = require('mongoose');

// Define the schema for the job postings
const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
}, { timestamps: true });  // This will automatically add createdAt and updatedAt fields

// Create the Job model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;