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

connectionRequestSchema.pre('save', function(next) {
  const connectionRequest = this;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cant send connection request to yourself")
  }
  next();
})

const ConnectionRequest = model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequest;
