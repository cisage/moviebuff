const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const AppError = require('../utils/AppError')

const comparePassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword,userPassword)
}

const signToken = (id) => {
    return jwt.sign(
        { id: id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
}


exports.signUp = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        const token = signToken(newUser._id)

        res.status(200).json({
            status: 'success',
            token: token,
            data: {
                user:newUser
            }
        })
    }
    catch (err) {
        next(new AppError(err.message,400))
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password)
            return next(new AppError('Please provide email or password', 400))
        
        const user = await User.findOne({ email: email }).select('+password')
        if (!user || (!await comparePassword(password,user.password)))
            return next(new AppError('Incorrect email or password', 401))
        
        const token = signToken(user._id)
        res.status(200).json({
            status: 'success',
            token:token
        })
        
    }
    catch (err) {
        next(new AppError(err.message,400))
    }
}