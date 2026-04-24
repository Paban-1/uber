const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
        minlength: [3, 'First name must be at least 3 characters long']
    },
    lastname: {
        type: String,
        minlength: [3, 'Last name must be at least 3 characters long']
    },
    email: {
        type: String,
        require: true,
        unique: true,
        minlength: [5, 'Email must be at least 3 characters long']
    },
    password: {
        type: String,
        require: true,
    },
    socketId: {
        type: String
    }
})