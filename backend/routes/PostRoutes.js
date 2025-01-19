import { Router } from "express";
import { createPost } from "../controllers/PostControllers.js";

const router = Router();

router.post("/createPost", createPost);

export default router;
