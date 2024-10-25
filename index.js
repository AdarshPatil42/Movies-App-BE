const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require('./src/routers/userRouter');
const moviesRouter = require('./src/routers/moviesRouter');
const cors = require('cors');


const server = express();
const PORT = process.env.PORT

// DB connect
mongoose.connect("mongodb://127.0.0.1/movieApp-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("DB is Connected...")
    }
});


server.use(express.json());
server.use(cors());
server.use('/api/user', userRouter);
server.use('/api/movies', moviesRouter);


server.listen(PORT, ()=> console.log(`Server is running on ${PORT}...`));


