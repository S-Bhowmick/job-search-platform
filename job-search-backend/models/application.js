const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resume: { type: String, required: true },  // You can change this to a file upload if needed
    coverLetter: { type: String },
    status: { type: String, default: 'Applied' },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;