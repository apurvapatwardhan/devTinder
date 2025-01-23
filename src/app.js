const express = require("express");
const connectToDB = require("./config/db");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("Data added");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//GET user by email
app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.find({ email });
    if(user.length === 0) {
        throw new Error("User doesnt exist")
    }
    res.send(user[0]);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET /feed
app.get("/feed",async (req, res, next) => {

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
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {});
