const express = require("express");
const { restrictTo, protect } = require("../controller/authController");
const {
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  createMovie,
  getRandomMovie,
} = require("../controller/movieController");

const movieRouter = express.Router();

movieRouter
  .route("/")
  .get(protect, restrictTo("admin"), getAllMovies)
  .post(protect, restrictTo("admin"), createMovie);

movieRouter.route("/random").get(protect, restrictTo("admin"), getRandomMovie);

movieRouter
  .route("/:id")
  .get(protect, restrictTo("admin"), getMovie)
  .patch(protect, restrictTo("admin"), updateMovie)
  .delete(protect, restrictTo("admin"), deleteMovie);

module.exports = movieRouter;
