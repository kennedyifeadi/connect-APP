const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const PostSchema = new Schema(
  {
    author: {
      type: Schema.ObjectId,
      ref: "User",
      required: true
    },
    media: {
      type: String
    },
    mediaType: {
      type: String,
      enum: ["image", "video"]
    },
    caption: {
      type: String,
      required: true
    },
    comments: [
      {
        type: Schema.ObjectId,
        ref: "Comment"
      }
    ],
    likes: [
      {
        type: Schema.ObjectId,
        ref: "Like"
      }
    ]
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", PostSchema);
