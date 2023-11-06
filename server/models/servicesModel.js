import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    basicprice: {
      type: String,
      required: true,
    },
    standardprice: {
      type: String,
      required: true,
    },
    premiumprice: {
      type: String,
      required: true,
    },
    bduration: {
      type: String,
      required: true,
    },
    sduration: {
      type: String,
      required: true,
    },
    pduration: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("services", servicesSchema);
