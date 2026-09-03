import { useState } from "react";
import axios from "axios";

function NoteForm({ setNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/notes",
        {
          title,
          content,
        }
      );

      setNotes((prevNotes) => [response.data, ...prevNotes]);

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;