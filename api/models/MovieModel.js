const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'A movie must have a title']
    },
    desc:{
        type:String,
        required:[true,'A movie must have a ']
    },
    imgFeatured: {
        type: String,
        required:[true,'A featured must have a poster image']
    },
    imgTitle: {
        type: String,
        required:[true,'Title image is needed']
    },
    imgThumbnail: {
        type: String,
        required:[true,'Thumbnail image is required']
    },
    year: String,
    limit: Number,
    genre: String,
    type: {
        enum: ['Series', 'Movie'],
        default:'Movie'
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie