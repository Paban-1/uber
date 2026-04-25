// require HashPassword
const userModel = require('../models/user.model')
const userService = require('../services/user.service')

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
    const { firstname, lastname, email, password } = req.body;

    // Now here we need hashedPassword from userModel
    const hashedPassword = await userModel.hashPassword(password);

    // Here create new user with userService here use the hashpassword, and this is the final user creation.
    const user = await userService.createUser({
        firstname,
        lastname,
        email,
        password: hashedPassword
    })

    // Now here set the token to the user using the generateAuthToken method that are creted at userModel
    const token = user.generateAuthToken()

    // After all of this just send the response with the token and user
    res.status(201).json({ token, user })
}