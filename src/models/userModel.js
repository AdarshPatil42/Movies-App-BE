const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }, 
    role:{
        type: String,
        required: true
    }
},{timestamps: true});

module.exports = new mongoose.model("user", userModel);