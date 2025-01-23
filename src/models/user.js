

const {Schema, model} = require("mongoose");
const validator = require('validator')


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type: String,
        maxLength: 20,
        minLength: 1
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxLength: 20,
        trim: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: (props) => `Not a valid email`
        }
    },
    password: {
        type: String,
        required: true,
        maxLength: 40,
        validate: {
            validator: (value) => validator.isStrongPassword(value),
            message: "Enter a String password!!"
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 70
    },
    gender: {
        type: String,
        validate: {
            validator: (value) => {
                if(!['male', 'female', 'other'].includes(value)) {
                    return false
                }
                return true
            },
            message: (props) => `${props.value} should be either male or female`
        }
    },
    photoUrl: {
        type: String,
        maxLength:100,
        minLength: 6,
        validate: {
            validator: (value) => validator.isURL(value),
            message: () => "Not a valid url"
        }
        },
    about: {
        type: String,
        default: "this is a default description of user",
        maxLength: 100
    },
    skills: {
        type: [String],
        validate: {
            validator: (value) => value.length <= 10,
            message: (props) => `Maximum skills can be 10`
        }
    }
}, {timestamps: true})

const User = model("User", userSchema);

module.exports = User;