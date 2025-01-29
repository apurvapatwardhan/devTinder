const { Schema, model } = require("mongoose");

const connectionRequestSchema = new Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "rejected", "accepted"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const ConnectionRequest = model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;
