const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
    title: String,
    company: String,
    duration: String,
    description: [String] 
});

module.exports = mongoose.model('Experience', ExperienceSchema);