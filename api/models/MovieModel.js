const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A movie must have a title"],
  },
  desc: {
    type: String,
    required: [true, "A movie must have a description"],
  },
  imgFeatured: {
    type: String,
    required: [true, "A featured must have a poster image"],
  },
  imgThumbnail: {
    type: String,
    required: [true, "Thumbnail image is required"],
  },
  year: String,
  limit: Number,
  genre: String,
  category: {
    type: String,
    enum: ["series", "movie"],
    default: "movie",
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
