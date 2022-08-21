const express = require("express");
const router = express.Router();
const response = require("./tv_family.json");
const Movie = require("../models/MovieModel");

const populateData = async (req, res) => {
  response.results.map(async (item) => {
    const newObj = {};
    newObj.title = item.name;
    newObj.desc = item.overview;
    newObj.imgFeatured = item.backdrop_path;
    newObj.imgThumbnail = item.poster_path;
    newObj.year = item.first_air_date.split("-")[0];
    newObj.limit = 18;
    newObj.genre = "Family";
    newObj.category = "series";
    //console.log(newObj);
    await Movie.create(newObj);
  });
  res.status(200).json({
    status: "success",
    data: response.results,
  });
};

const getMovieIds = async (req, res) => {
  try {
    const data = await Movie.find({ genre: req.params.id, category: "series" });
    const newdata = data.map((el) => {
      return el._id;
    });
    res.status(200).json({
      status: "success",
      results: newdata.length,
      data: newdata,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
    });
  }
};

router.route("/").post(populateData);
router.route("/:id").get(getMovieIds);

module.exports = router;
