const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

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
        res.status(400).json({
            status: 'fail',
            message:err.message
        })
    }
}