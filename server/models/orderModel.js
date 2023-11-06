import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {},
    userId: {},
    service: {},
    price: {},
    email: {},
    phone: {},
    address: {},
    status: {
      type: String,
      default: "Not Process",
      enum: [
        "Not Process",
        "Processing",
        "Working",
        "Complete",
        "Cancel",
        "Not In Range!",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
