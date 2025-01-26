
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userAuth = async (req, res, next) => {

    try {
        const token = req.cookies['jwt'];
        if(!token) {
            throw new Error("Not valid token");
        }
    
        const {id} = jwt.verify(token, "Secretfdlkjnsdjkfncd");
        const user = await User.findById(id);
        if(!user) {
           throw new Error("User not found")
        }
        req.user = user;
    
        next();
    }

    catch(err) {
        return res.status(400).send(err.message)
    }
}

module.exports = {userAuth};