import express from "express";
import { createTask } from "../controllers/taskController.js";
import { getTaskById } from "../controllers/taskController.js";
import { createTask,deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/:id", getTaskById);
router.delete("/:id",deleteTask)

export default router;