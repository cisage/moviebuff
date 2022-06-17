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
        console.log(user)
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

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        
        if (!token)
            return next(new AppError('You are not logged in,log in to get access', 401))
        
        //verify token

        const decodedString = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decodedString)
        const user = await User.findById(decodedString.id)
        if (!user)
            return next(new AppError('The user with this token no longer exists', 401))
        
        req.user = user
        next()

    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            
            return next(new AppError('You dont have access to perform this action',403))
        }

        next()
    }
}