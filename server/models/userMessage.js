import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    messages: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("message", contactSchema);
