const express = require("express");
const { userAuth } = require("../middleware/auth");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post("/sendConnectionRequest", userAuth, async(req, res, next) => {
    res.send("Connection request sent");
  })

  module.exports = connectionRequestRouter