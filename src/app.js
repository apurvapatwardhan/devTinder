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
    res.status(500).send("Something wen wrong");
  }
});

connectToDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {});
