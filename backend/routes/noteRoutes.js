import express from "express";
import { createNote, getNotes, getNotesById,updateNote} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);

router.get("/", getNotes);
router.get("/:id", getNotesById);


router.put("/:id", updateNote);

export default router;