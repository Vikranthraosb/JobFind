const mongoose = require('mongoose');

const userSchema2 = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    profileImage: String,
    contact: Number,
    boards: {
        type: Array,
        default: []
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }],
    skills: [{
        name: String,
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
        }
    }],
    academics: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startYear: Number,
        endYear: Number,
    }],
    experiences: [{
        title: String,
        company: String,
        location: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
});

module.exports = mongoose.model("User2", userSchema2);
