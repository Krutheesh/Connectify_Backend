const mongoose = require('mongoose');

const friendRequestSchema = mongoose.Schema(

  {
    sender:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true

    },
    recipient:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status:{
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }

  },{
  timestamps: true
  }


)


module.exports = mongoose.model("FriendRequest", friendRequestSchema);