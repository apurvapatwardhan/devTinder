const validator = require('validator')

const validateSignupData = (req) => {
    const {email, firstName, password, lastName} = req.body;
    
    if(!firstName || !lastName) {
        throw new Error("Name is not valid")
    }

    if(firstName.length < 4 || firstName.length > 50) {
        throw new Error("First Name is not valid")
    }

    if(lastName.length < 4 || lastName.length > 50) {
        throw new Error("Last Name is not valid")
    }

    if(!email || !password) {
        throw new Error("Email and password is required");
    }

    if(!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error('Password needs to be Strong')
    }
}

const validateLoginData = (req, fields) => {
    if(!req.body) {
        throw new Error('Please provide email and password')
    }
    const areSpecifiedFields = Object.keys(req?.body).every(field => fields.includes(field));
    if(!areSpecifiedFields) {
        throw new Error("Data not correct");
    }
    if(!validator.isEmail(req.body.email)) {
        throw new Error("Not a valid email")
    }
}

module.exports = {
    validateSignupData, validateLoginData
}