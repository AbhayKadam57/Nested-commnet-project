import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    content: { type: String, require: true },
  },
  { timestamps: true }
);

const Posts = new mongoose.model("posts", PostSchema);

export default Posts;
