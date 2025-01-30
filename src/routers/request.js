const express = require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { validateSendRequestStatus } = require("../../utils/validation");
const User = require("../models/user");

const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      validateSendRequestStatus(status);

      //check if the other person exists
      const toUserExists = await User.findById(toUserId);
      console.log(toUserExists);
      if (!toUserExists) {
        throw new Error("Invalid User connection Request");
      }

      //check if there is already a connection request
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        throw new Error("Already connection request present");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.status(200).json({
        message: "Connection request sent succesfully",
        data,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed!!",
        message: error.message,
      });
    }
  }
);

module.exports = connectionRequestRouter;
