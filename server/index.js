import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import newsRoute from "./routes/newsRoutes.js";
import contactRoute from "./routes/contactRoute.js";
import serviceRoute from "./routes/servicesRoute.js";
import userContactRoute from "./routes/userContactRoute.js";
import commentRoute from "./routes/commentRoute.js";
import blogRoute from "./routes/blogRoutes.js";
import orderRoute from "./routes/orderRoute.js";

const app = express();

// Dotenv Config
dotenv.config();

// DB Config
connectDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// API's
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/user-contact", userContactRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/order", orderRoute);

// Rest API
app.use("/", (req, res) => {
  res.send(`<h1>Server is Ready!</h1>`);
});

// PORT
const PORT = process.env.PORT;

app.listen(5000, () => {
  console.log(`Server is running at PORT ${PORT}`.bgMagenta.white);
});
