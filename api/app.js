const express = require("express")
const listRouter = require("./routes/listRoutes")
const movieRouter = require("./routes/movieRoutes")
const userRouter = require("./routes/userRoutes")

const app = express()

app.use(express.json())

app.use('api/mov/users', userRouter)
app.use('api/mov/movies',movieRouter)
app.use('api/mov/lists',listRouter)

module.exports = app