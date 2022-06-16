const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'A list must have a titel'],
        unique:[true,'A list must have a unique title']
    },
    type: String,
    genre: String,
    content: Array
})

const List = mongoose.model('List', listSchema)

module.exports = List