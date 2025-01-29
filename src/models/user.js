

const {Schema, model} = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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
        minLength: 1,
        required: true
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
        enum : {
            values: ["male", "female"],
            message: `{VALUE} is not a valid gender type`
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
}, {timestamps: true});

userSchema.methods.setPassword = async function(password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    this.password = hashedPassword;
}

userSchema.methods.getJwt = async function() {
    const user = this;
    const userId = user._id;
    const token = await jwt.sign({id: userId}, 'Secretfdlkjnsdjkfncd');
    return token;
}

userSchema.methods.isCorrectPassword = async function(password) {
    const user = this;
    const passwordHash = user.password
    return bcrypt.compare(password, passwordHash);
}

userSchema.methods.toSafeObject = async function() {
    const user = this;
    const {password, ...safeUser} = user.toObject();
    return safeUser;
}

const User = model("User", userSchema);

module.exports = User;