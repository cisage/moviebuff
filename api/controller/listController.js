const List = require("../models/ListModel");
const AppError = require("../utils/AppError");

exports.createList = async (req, res, next) => {
  try {
    const list = await List.create(req.body);
    res.status(200).json({
      status: "success",
      list,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

exports.updateList = async (req, res, next) => {
  try {
    const id = req.params.id;

    const list = await List.findById(id);
    if (!list) return next(new AppError("This movie list does not exist", 401));
    const newObj = {};
    if (req.body.title) newObj.title = req.body.title;
    if (req.body.genre) newObj.genre = req.body.genre;
    if (req.body.category) newObj.category = req.body.category;
    if (req.body.content) newObj.content = req.body.content;

    console.log(newObj);
    const updatedList = await List.findByIdAndUpdate(id, newObj, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      list: updatedList,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

//DELETE

exports.deleteList = async (req, res, next) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return next(new AppError("This list does not exist"), 401);

    await List.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

//GETONE

exports.getList = async (req, res, next) => {
  try {
    const id = req.params.id;

    const list = await List.findById(id);
    console.log(list);
    if (!list) return next(new AppError("This list does not exist", 401));

    res.status(200).json({
      status: "success",
      list,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};

//get all

exports.getAllLists = async (req, res, next) => {
  try {
    const lists = await List.find();

    console.log(lists);
    res.status(200).json({
      status: "success",
      results: lists.length,
      lists,
    });
  } catch (err) {
    return next(new AppError(err.message, 400));
  }
};
