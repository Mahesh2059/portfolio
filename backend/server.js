const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const Experience = require('./models/Experience');
const Message = require('./models/Message');
const Skill = require('./models/Skill');
const Project = require('./models/Project.js');

const app = express();

//MIDDLEWARE

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());

//MONGODB 

const MONGO_URI = 'mongodb://127.0.0.1:27017/portfolio';

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log(err));

//EXPERIENCE API

app.get('/api/experience', async (req, res) => {

    try {

        const jobs = await Experience.find();

        res.json(jobs);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

//SKILLS API

app.get('/api/skills', async (req, res) => {

    try {

        const skills = await Skill.find();

        res.json(skills);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

//MESSAGE API

app.post('/api/message', async (req, res) => {

    try {

        const newMessage = new Message(req.body);

        await newMessage.save();

        res.status(201).json({
            message: "Message Saved Successfully"
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

// PROJECTS API

app.get('/api/projects', async (req, res) => {

    try {

        const projects = await Project.find();

        res.json(projects);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

//SERVER

const PORT = 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);

});