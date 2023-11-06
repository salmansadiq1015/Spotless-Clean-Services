import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Server ${conn.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
