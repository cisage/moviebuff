const User = require('../models/UserModel')
const AppError = require('../utils/AppError')


//UPDATE

//user
exports.updateMe = async (req,res,next) => {
    try {
        console.log(req)
        if (req.body.password || req.body.passwordConfirm)
            return next(new AppError('This is not the route for updating password', 400))
        
        const newObj = {}
        if (req.body.email)
            newObj.email = req.body.email
        if (req.body.name)
            newObj.name = req.body.name
        
        console.log(newObj)
        const updatedUser = await User.findByIdAndUpdate(req.user._id, newObj, {
            new:true,
            runValidators: true
        })

        res.status(200).json({
            status:'success',
            user:updatedUser
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//update by admin
exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const user = await User.findById(id)
        if (!user)
            return next(new AppError('This user does not exist',401))
        const newObj = {}
        if (req.body.email)
            newObj.email = req.body.email
        if (req.body.name)
            newObj.name = req.body.name
        if (req.body.role)
            newObj.role = req.body.role
        console.log(newObj)
        const updatedUser = await User.findByIdAndUpdate(id, newObj, {
            new:true,
            runValidators: true
        })

        res.status(200).json({
            status:'success',
            user:updatedUser
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//DELETE

//delete by user
exports.deleteMe = async (req,res,next) => {
    try {
        await User.findByIdAndDelete(req.user._id)
        res.status(204).json({
            status:'success',
            data:null
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}
//delete by admin
exports.deleteUser = async (req,res,next) => {
    try {

        const user = await User.findById(req.params.id)
        if (!user)
            return next(new AppError('This user does not exist'), 401)
        
        await User.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'success',
            data:null
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//GETONE

//get user when log in
exports.getMe = async (req,res,next) => {
    try {
        
        const user = await User.findById(req.user._id)

        res.status(200).json({
            status:'success',
            user
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//update by admin
exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const user = await User.findById(id)
        console.log(user)
        if (!user)
            return next(new AppError('This user does not exist',401))
        

        res.status(200).json({
            status:'success',
            user
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//get all

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        console.log(users)
        res.status(200).json({
            status: 'success',
            results: users.length,
            users
        })
    }
    catch (err) {
        return next(new AppError(err.message,400))
    }
}

//get user stats
