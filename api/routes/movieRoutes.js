const express = require('express')
const { restrictTo, protect } = require('../controller/authController')
const { getAllMovies, getMovie, updateMovie, deleteMovie, createMovie } = require('../controller/movieController')

const movieRouter = express.Router()

movieRouter.route('/').get(protect, restrictTo('admin'), getAllMovies)

movieRouter.route('/:id')
    .get(protect, restrictTo('admin'), getMovie)
    .patch(protect, restrictTo('admin'), updateMovie)
    .delete(protect, restrictTo('admin'), deleteMovie)
    .post(protect,restrictTo('admin'),createMovie)

module.exports = movieRouter