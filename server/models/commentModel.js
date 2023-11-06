import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("comments", commentSchema);
