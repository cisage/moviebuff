const express = require('express')
const {protect,restrictTo} = require('../controller/authController')
const { getAllLists, getList, updateList, deleteList, createList } = require('../controller/listController')

const listRouter = express.Router()

listRouter.route('/').get(protect, restrictTo('admin'), getAllLists)

listRouter.route('/:id')
    .get(protect, restrictTo('admin'), getList)
    .patch(protect, restrictTo('admin'), updateList)
    .delete(protect, restrictTo('admin'), deleteList)
    .post(protect,restrictTo('admin'),createList)

module.exports = listRouter