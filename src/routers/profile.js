const express = require("express");
const { userAuth } = require("../middleware/auth");


const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
    return res.status(200).send(req.user);
  })

  module.exports = profileRouter