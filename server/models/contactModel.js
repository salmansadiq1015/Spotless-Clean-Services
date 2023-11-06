import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    country: {
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
    telephone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("contact", contactSchema);
