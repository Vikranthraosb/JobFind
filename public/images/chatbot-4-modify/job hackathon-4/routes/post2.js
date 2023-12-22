const mongoose = require('mongoose');

const postSchema2 = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    title: String,
    description: String,
    image: String,
    cname: String,
    jname: String,
    jdesc: String,
    qualify: String,
    skills: [{ type: String }], 
    achievement: String,
    lang: String,
    exp: String, 
    internship: Boolean,
    education: String,
    location: String,
    employmentType: String,
    salary: String,
    language: String,
});

const JobApplication = mongoose.model('post2', postSchema2);

module.exports = JobApplication;

