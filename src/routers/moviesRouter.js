const express = require('express');
const { getAllMovies, addMovies, deleteMovies, updateMovies, searchMovies, singleMovie } = require('../controllers/moviesController');
const { auth} = require('../middleware/auth');

const moviesRouter = express.Router();


// moviesRouter.get('/all',auth(["admin","user"]),  getAllMovies);
moviesRouter.get('/all', getAllMovies);
moviesRouter.post('/add', auth(["admin"]), addMovies);
moviesRouter.delete('/delete/:id', auth(["admin"]), deleteMovies);
moviesRouter.put('/update/:id', auth(["admin"]), updateMovies);
moviesRouter.get('/singleMovie/:id', auth(["admin","user"]), singleMovie);
moviesRouter.get('/search/:key', auth(["admin", "user"]), searchMovies);

module.exports = moviesRouter;