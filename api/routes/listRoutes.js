const express = require("express");
const { protect, restrictTo } = require("../controller/authController");
const {
  getAllLists,
  getList,
  updateList,
  deleteList,
  createList,
} = require("../controller/listController");

const listRouter = express.Router();

listRouter
  .route("/")
  .get(getAllLists)
  .post(protect, restrictTo("admin"), createList);

listRouter
  .route("/:id")
  .get(getList)
  .patch(protect, restrictTo("admin"), updateList)
  .delete(protect, restrictTo("admin"), deleteList);

module.exports = listRouter;
