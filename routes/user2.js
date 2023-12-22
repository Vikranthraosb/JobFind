const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema2 = new mongoose.Schema({
  username: String,
    name: String,
    email: String,
    password: String,
    ProfileImage: String,
    contact: Number,
    boards: {
        type: Array,
        default: []
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
});

userSchema2.plugin(passportLocalMongoose); // Apply passport-local-mongoose plugin

module.exports = mongoose.model("user2", userSchema2);
