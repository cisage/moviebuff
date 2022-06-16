const express = require('express')
const signUp = require('../controller/authController')

const userRouter = express.Router()

userRouter.route('/signup').post(signUp)

module.exports = userRouter