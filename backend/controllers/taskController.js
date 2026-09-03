import mongoose from "mongoose";
import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { taskName, description, status } = req.body;

    const task = await Task.create({
      taskName,
      description,
      status,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching task",
      error: error.message,
    });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const hasName = req.body.name !== undefined || req.body.taskName !== undefined;
    const hasDescription = req.body.description !== undefined;

    if (!hasName && !hasDescription) {
      return res.status(400).json({
        message: "At least one of name, taskName, or description is required",
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (hasName) {
      const taskName = req.body.name ?? req.body.taskName;
      if (typeof taskName !== "string" || !taskName.trim()) {
        return res.status(400).json({ message: "Task name cannot be empty" });
      }
      task.taskName = taskName;
    }

    if (hasDescription) {
      if (
        typeof req.body.description !== "string" ||
        !req.body.description.trim()
      ) {
        return res.status(400).json({ message: "Description cannot be empty" });
      }
      task.description = req.body.description;
    }

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid task data" });
    }

    res.status(500).json({ message: "Failed to update task" });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const { status } = req.body;
    const validStatuses = Task.schema.path("status").enumValues;

    if (typeof status !== "string" || !validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Invalid task status" });
    }

    res.status(500).json({ message: "Failed to update task status" });
  }
};