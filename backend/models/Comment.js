import mongoose, { Schema } from "mongoose";

const CommnetSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      require: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
      default: null,
    },
    content: { type: String, require: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", CommnetSchema);

export default Comment;
