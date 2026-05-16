// Require initial packeges
const mongoose = require('mongoose')

// create captain Shcema
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            require: true,
            minlength: [3, 'fristName must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'lastname must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'please enter a valid email']
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', "inactive"],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            require: true,
            minlength: [3, 'color must be at least 3 charcaters long']
        },
        plate: {
            type: String,
            require: true,
            minlength: [3, 'plate must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            require: true,
            min: [1, 'capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            require: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }
})