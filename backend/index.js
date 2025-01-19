import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./db/index.js";
import UserRoutes from "./routes/UserRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";
import CommentRoutes from "./routes/CommentRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/user", UserRoutes);
app.use("/api/post", PostRoutes);
app.use("/api/comment", CommentRoutes);

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
  connect();
});
