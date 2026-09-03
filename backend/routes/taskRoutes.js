import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
  updateTask,
  updateTaskStatus
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.patch("/:id/status", updateTaskStatus);
router.delete("/:id", deleteTask);

export default router;