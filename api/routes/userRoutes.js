const express = require('express')
const { signUp,login, protect,restrictTo } = require('../controller/authController')
const { updateMe,deleteMe,getMe, updateUser,deleteUser,getUser,getAllUsers } = require('../controller/userController')


const userRouter = express.Router()

userRouter.route('/signup').post(signUp)
userRouter.route('/login').post(login)

//CRUD
userRouter.route('/updateMe').patch(protect, updateMe)
userRouter.route('/deleteMe').delete(protect, deleteMe)
userRouter.route('/getMe').get(protect, getMe)

userRouter.route('/:id')
    .patch(protect, restrictTo('admin'), updateUser)
    .delete(protect, restrictTo('admin'), deleteUser)
    .get(protect, restrictTo('admin'), getUser)

userRouter.route('/').get(protect, restrictTo('admin'), getAllUsers)

module.exports = userRouter