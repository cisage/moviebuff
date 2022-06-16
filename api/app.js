const express = require("express")
const morgan = require('morgan')


const listRouter = require("./routes/listRoutes")
const movieRouter = require("./routes/movieRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

app.use(express.json())
if (process.env.NODE_ENV === 'development')
    app.use(morgan('dev'))

app.use('/api/mov/users', userRouter)
app.use('/api/mov/movies',movieRouter)
app.use('/api/mov/lists', listRouter)


app.use((err, req, res, next) => {
    res.status(err.statusCode).json({
        status: err.status,
        message:err.message
    })
})

module.exports = app