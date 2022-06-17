const Movie = require('../models/MovieModel')
const AppError = require('../utils/AppError')

exports.createMovie = async (req, res, next) => {
    try {
        const movie = await Movie.create(req.body)
        res.status(200).json({
            status: 'success',
            movie
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

exports.updateMovie = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const movie = await Movie.findById(id)
        if (!movie)
            return next(new AppError('This movie does not exist',401))
        const newObj = {}
        if (req.body.title)
            newObj.title = req.body.title
        if (req.body.desc)
            newObj.desc = req.body.desc
        if (req.body.imgFeatured)
            newObj.imgFeatured = req.body.imgFeatured
        if (req.body.imgTitle)
            newObj.imgTitle = req.body.imgTitle
        if (req.body.imgThumbnail)
            newObj.imgThumbnail = req.body.imgThumbnail
        if (req.body.year)
            newObj.year = req.body.year
        if (req.body.limit)
            newObj.limit = req.body.limit
        if (req.body.genre)
            newObj.genre = req.body.genre
        if (req.body.category)
            newObj.category = req.body.category
        
        console.log(newObj)
        const updatedMovie = await Movie.findByIdAndUpdate(id, newObj, {
            new:true,
            runValidators: true
        })

        res.status(200).json({
            status:'success',
            movie:updatedMovie
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//DELETE


exports.deleteMovie = async (req,res,next) => {
    try {

        const movie = await Movie.findById(req.params.id)
        if (!movie)
            return next(new AppError('This movie does not exist'), 401)
        
        await Movie.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'success',
            data:null
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//GETONE

exports.getMovie = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const movie = await Movie.findById(id)
        console.log(movie)
        if (!movie)
            return next(new AppError('This movie does not exist',401))
        

        res.status(200).json({
            status:'success',
            movie
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//get all

exports.getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find()
        console.log(movies)
        res.status(200).json({
            status: 'success',
            results: movies.length,
            movies
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}


