import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;