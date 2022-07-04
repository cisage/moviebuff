const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const listRouter = require("./routes/listRoutes");
const movieRouter = require("./routes/movieRoutes");
const userRouter = require("./routes/userRoutes");
const popRouter = require("./routes/popRoutes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/mov/users", userRouter);
app.use("/api/mov/movies", movieRouter);
app.use("/api/mov/lists", listRouter);
app.use("/api/populate", popRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
