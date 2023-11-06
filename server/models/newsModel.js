import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("subscription", newsSchema);
