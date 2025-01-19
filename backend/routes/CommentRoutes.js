import { Router } from "express";
import {
  createComment,
  getComments,
} from "../controllers/CommentControllers.js";

const router = Router();

router.post("/createComment", createComment);

router.get("/getComments/:postId", getComments);

export default router;
