const moviesModel = require('../models/moviesModel');


const getAllMovies = async(req, res)=>{
    try {
        const movies = await moviesModel.find({userId: req.userId});
        res.status(200).json({movies});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong..!"})
    }
}

const addMovies = async(req, res)=>{
    try {
        const {img, movieName, year, runtime,categories} = req.body;
        const movies = await new moviesModel({
            img: img,
            movieName: movieName,
            year: year,
            runtime: runtime,
            categories: categories,
            userId: req.userId
        }).save();

        res.status(201).json({message:"New Movie Added Successfully..!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong..!"})
    }
}

const updateMovies = async(req, res)=>{
    try {
        const id = req.params.id;
        const {img, movieName, year, runtime, categories} = req.body;

        const movies ={
            img: img,
            movieName: movieName,
            year: year,
            runtime: runtime,
            categories: categories,
            userId: req.userId
        }
        
        await moviesModel.findByIdAndUpdate(id, movies, {new: true});
        res.status(201).json({message:"Movie Updated Successfully..!"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong..!"})
    }
}

const deleteMovies = async(req, res)=>{
    try {
        const id = req.params.id;
        const movies = await moviesModel.findByIdAndRemove(id);

        res.status(202).json({message:"Movies Deleted Successfully..!"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong..!"})
    }
}

const singleMovie = async(req, res)=>{
    try {
        const id = req.params.id;
        const movies = await moviesModel.findOne({_id: id});
        res.status(200).json(movies)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong..!"})
    }
}

const searchMovies = async(req, res)=>{
    try {
        const movies = await moviesModel.find({
            "$or":[
                {"movieName":{$regex:req.params.key, $options:'i'}},
                {"year":{$regex:req.params.key}},
                {"categories":{$regex:req.params.key, $options:'i'}}
            ]
        });
        res.status(200).json(movies);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something Went Wrong..!"})
    }
}

module.exports = {getAllMovies, addMovies, updateMovies, deleteMovies, singleMovie, searchMovies}