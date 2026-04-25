// Require Nassacary Packges
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const userController = require('../controllers/user.controller')

// Create Route for Register user WIth all Validation
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be 3 Caracter Long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 Caracter Long')
],
    // Call the controller for Register 
    userController.registerUser
)

module.exports = router