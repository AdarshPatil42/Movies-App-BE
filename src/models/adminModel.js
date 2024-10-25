const mongoose = require('mongoose');

const adminModel = new mongoose.Schema({
    
    adminName:{
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
    }
},{timestamps: true});

module.exports = new mongoose.model("admin", adminModel);