import express from "express";

import {
  createNote,
  deleteNote,
  getNotes,
  getNotesById,
  togglePin,
  updateNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);

router.get("/", getNotes);
router.get("/:id", getNotesById);

router.put("/:id", updateNote);
router.patch("/:id/pin", togglePin);
router.delete("/:id", deleteNote);

export default router;