const express = require("express");
const connectToDB = require("./config/db");
const User = require("./models/user");
const { validateSignupData, validateLoginData } = require("../utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req, res, next) => {
  //validate req body
  try {
    validateSignupData(req);
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = new User({...userData, password: hashedPassword});
    await user.save();
    res.send("Data added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    validateLoginData(req, ['email', 'password']);

    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) {
      throw new Error("User doesnt exist");
    }

    const isPasswordCorrect = await user.isCorrectPassword(password);
    if(!isPasswordCorrect) {
      throw new Error("Not valid credentials");
    }

    //create a jwt token
    const token = await user.getJwt();
    res.cookie('jwt', token, {httpOnly: true, expiresIn : '1d'});

    return res.status(200).send("User logged in")
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.get("/profile", userAuth, async (req, res) => {
  return res.status(200).send(req.user);
})

app.post("/sendConnectionRequest", userAuth, async(req, res, next) => {
  res.send("Connection request sent");
})

// GET /feed
app.get("/feed", userAuth, async (req, res, next) => {

    try {
        const users = await User.find({});
        res.send(users)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message,
          });
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("User deleted success");
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
})

app.patch("/user:userId", async (req, res) => {
    const body = req.body;
    const userId = req.params.userId;
    try {
        const ALLOWED_UPDATES = ['gender', 'age', 'skills', 'photoUrl', 'about'];
        const isUpdateAllowed = Object.keys(body).every(key => ALLOWED_UPDATES.includes(key));
        if(!isUpdateAllowed) {
          throw new Error("Update not allowed");
        }
        const updatedUser = await User.findByIdAndUpdate(user.userId, user, {returnDocument: 'after', runValidators: true});
        console.log(updatedUser)
        res.send("User Updated success");
    } catch (error) {
        res.status(500).send(error.message)
    }
})

connectToDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(3001, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {});
