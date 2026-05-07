const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    title: String,
    company: String,
    duration: String,
    description: [String] // This is an array for your bullet points
});

module.exports = mongoose.model('Experience', ExperienceSchema);