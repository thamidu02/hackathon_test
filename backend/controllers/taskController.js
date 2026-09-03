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