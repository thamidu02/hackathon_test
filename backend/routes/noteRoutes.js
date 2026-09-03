import express from "express";
import { createNote, getNotes, getNotesById } from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNotesById);


export default router;