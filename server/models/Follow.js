const mongoose = require("mongoose");
const Schema = mongoose;

const FollowSchema = new Schema(
  {
    follower: {
        type: Schema.ObjectId
    },
    following: {
        type: Schema.ObjectId
    }
  },
  { timestamps: true }
);

const Follow = mongoose.model("Follow", FollowSchema);

module.exports = Follow;
