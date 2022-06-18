const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A list must have a titel"],
    unique: [true, "A list must have a unique title"],
  },
  category: String,
  genre: String,
  content: {
    type: Array,
    required: [true, "A list cant have no movies"],
  },
});

const List = mongoose.model("List", listSchema);

module.exports = List;
