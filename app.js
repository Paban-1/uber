const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const app = express()
const connectToDb = require('./db/db')
// require user route for config and use 
const userRoutes = require('./routes/user.routes')
// Require cookie parser for get the token from cookies
const cookieParser = require('cookie-parser')

connectToDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) 

// Config the routes
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.send('yoo')
})

module.exports = app