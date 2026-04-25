// Require nassary fles
const userModel = require('../models/user.model')

// Create User That to use in User controller to register/Create User.
module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    // Check if any of those field are empty or not exist then trow an error
    if (!firstname || !email || !password) {
        throw new Error('All fields are required')
    }

    // After check if all field are good and have data then the user will created at this moment, call the userModel to create the user.
    const user = userModel.create({
        // Pass Data as per the Model (here the password should be hash where it will called)
        fullname: {
            firstname,
            lastname
        },
        email,
        // Password must be hash 
        password 
    })
    return user;
}