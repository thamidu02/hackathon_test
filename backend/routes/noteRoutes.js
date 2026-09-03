import express from "express";

import {
  createNote,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);

router.get("/", getNotes);

router.put("/:id", updateNote);

export default router;