// Require Nassacary Packages
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Created User Model
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
        select: false
    },
    socketId: {
        type: String
    }
})

// Create Some Methods
// Geanrate Auth Token
userSchema.methods.generateAuthToken = function () {
    // This method genarate jwt token & this method contains token as user id
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
    return token
}

// Compare Password Between user given and DB password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Hash The password for extra security
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10)
}

// Export The User Model 
const userModel = mongoose.model('user', userSchema)
module.exports = userModel