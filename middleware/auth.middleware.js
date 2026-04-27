// Require user model
const userModel = require('../models/user.model')
// Require bcrypt for compare password
const bcrypt = require('bcrypt')
// Require jsonwebtoken for generate token
const jwt = require('jsonwebtoken')

// making a authUser auth middleware for protect the routes
module.exports.authUser = async (req, res, next) => {
    // Get the token from cookies and if it not in cookies then get it from header
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]
    
    // if the token is not exist then send 401 status with a message
    if (!token) {
        return res.status(401).json({ message: 'Access denied.' })
    }

    // if the token exist then verify the token with the secret key that we used to generate the token
    try {
        // decoded the token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // we send the token as user id in userModel so we can get the user by id from the token
        const user = await userModel.findById(decoded._id)
        // return the user to the request for use in the next middleware or controller
        req.user = user
        return next()
    } catch (error) {
        // if the token is invalid then send 401 status with a message
        return res.status(401).json({ message: 'unauthorized' })
    }
}