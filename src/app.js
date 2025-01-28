const express = require("express");
const connectToDB = require("./config/db");
const User = require("./models/user");
const { validateSignupData, validateLoginData } = require("../utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const { userAuth } = require("./middleware/auth");
const authRouter = require("./routers/auth")
const profileRouter = require("./routers/profile");
const connectionRequestRouter = require("./routers/request");

const app = express();

app.use(express.json());
app.use(cookieParser())

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter)


connectToDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(3001, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {});
