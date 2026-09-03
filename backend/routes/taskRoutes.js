import express from "express";

import {
  createTask,
  getTasks,
  getTaskById,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.delete("/:id", deleteTask);

export default router;