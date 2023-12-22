const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const natural = require('natural');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/resumeAnalyzer', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Create Resume model
const resumeSchema = new mongoose.Schema({
  content: String,
});

const Resume = mongoose.model('Resume', resumeSchema);

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());

// Serve the frontend
app.use(express.static('public'));

// Handle file upload
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const content = req.file.buffer.toString('utf-8');

    // Store resume in MongoDB
    const newResume = new Resume({ content });
    await newResume.save();

    // Analyze the resume (basic keyword matching for demonstration purposes)
    const skills = ['JavaScript', 'Node.js', 'Express.js', 'MongoDB','Java','C','Communication','C++','HTML','CSS','Javascript','Teamwork',
    	'Time management',
    	'Critical thinking',
    	'Organisational skills',
    	'Creativity',
    	'Motion graphics'
    ];
    const matchedSkills = skills.filter(skill => natural.JaroWinklerDistance(content, skill) > 0.8);
    const resumeMatchPercentage = (matchedSkills.length / skills.length) * 100;

    // Simulate matching with a job posting in the database
    const jobPostingMatchPercentage = await matchWithJobPosting(content);
    
    res.json({ resumeMatchPercentage, jobPostingMatchPercentage });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Placeholder function to simulate matching with job posting in the database
async function matchWithJobPosting(resumeContent) {
  try {
    // Use environment variables or a configuration file for MongoDB connection string
    const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();

    const db = mongoClient.db('resumeAnalyzer');
    const collection = db.collection('jobPostings');

    // For simplicity, assuming the job posting is stored in a MongoDB collection
    const jobPosting = await collection.findOne();

    // Implement your logic to compare the resume content with the job posting in the database
    // For simplicity, this function just returns a random percentage.
    const matchPercentage = Math.floor(Math.random() * 50);

    // Close the MongoDB connection
    await mongoClient.close();

    return matchPercentage;
  } catch (error) {
    console.error('Error fetching job posting from MongoDB:', error);
    throw error;
  }
}

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
