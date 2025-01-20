

const mongoose = require("mongoose");

async function connectToDB() {
    await mongoose.connect('mongodb+srv://appuvp2710:FXgcBpZydQJYUZN9@cluster0.elr6b.mongodb.net/devTinder');
}

module.exports = connectToDB;