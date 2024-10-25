const mongoose = require('mongoose');

const moviesModel = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },
    movieName:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    runtime:{
        type: String,
        required: true
    },
    categories:[
        {type: String}
    ]
    
    
},{timestamps: true});

module.exports = new mongoose.model("movie", moviesModel);