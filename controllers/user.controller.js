// require HashPassword
const userModel = require('../models/user.model')
const userService = require('../services/user.service')
// require BlacklistToken model for blacklisting the token when user logout
const blacklistTokenModel = require('../models/blacklistToken.model')

// require Validator Result that coming from user.routes if any issue happend while creating user this will give the errors
const { validationResult } = require('express-validator')

// Controller for register User
module.exports.registerUser = async (req, res, next) => {
    // Checking for errors thoses send by express-validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // if the errors is not empty the it will be send 400 status bad requirest with a json formate data in a from of array
        return res.status(400).json({ errors: errors.array() })
    }
    // After all checks user will created at this point 
    // First we deStucture the data
    const { fullname, lastname, email, password } = req.body;

    // Now here we need hashedPassword from userModel
    const hashedPassword = await userModel.hashPassword(password);

    // Here create new user with userService here use the hashpassword, and this is the final user creation.
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    })

    // Now here set the token to the user using the generateAuthToken method that are creted at userModel
    const token = user.generateAuthToken()

    // After all of this just send the response with the token and user
    res.status(201).json({ token, user })
}

// Controller for Login User
module.exports.loginUser = async (req, res, next) => {
    // checking for errors thoses send by express-validator
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // After all checks user will login at this point
    // First we deStucture the data
    const { email, password } = req.body;
    // At userModel  the password is select false so we need to + for to tell the mongoose to select the password for login
    const user = await userModel.findOne({ email }).select('+password')

    // if the user is not exist then send 401 status with a message,
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    // use The comparePassword method that we created at userModel, to use to compare password with userGiven password and the system password.
    const isMatch = await user.comparePassword(password)

    // check if the password is not match the send status code 401 (unauthorized) with a message.
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Now here set the token to the user using the generateAuthToken method that are creted at userModel
    const token = user.generateAuthToken()
    // After all of this just send the response with the token and user

    // send cookies 
    res.cookie('token', token)
    res.status(200).json({ token, user })
}

// Controller for Logout User
module.exports.logoutUser = async (req, res, next) => {
    // to logout user we need to clear cookies
    res.clearCookie('token')
    // get the token for blacklisting
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]

    // blacklist the token come from cookies or headers
    await blacklistTokenModel.create({ token })

    // Send response with a message
    res.status(200).json({ message: 'User logged out successfully' })
}

// Controller for Get user Profile
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user)
}