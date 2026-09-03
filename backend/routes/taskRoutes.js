import express from "express";
import { createTask } from "../controllers/taskController.js";
import { getTaskById } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/:id", getTaskById);

export default router;