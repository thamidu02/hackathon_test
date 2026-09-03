import { useState } from "react";
import "./NoteList.css";

function NoteList({ notes, setNotes, onTogglePin, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const startEditing = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  const updateNote = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editTitle,
            content: editContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();

      setNotes((previousNotes) =>
        previousNotes.map((note) =>
          note._id === id ? updatedNote : note
        )
      );

      cancelEditing();
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes yet.</p>
        <span>Create your first note above.</span>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <article className="note" key={note._id}>
          {editingId === note._id ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
              />

              <textarea
                value={editContent}
                onChange={(event) => setEditContent(event.target.value)}
                rows="5"
              />

              <div className="note-actions">
                <button onClick={() => updateNote(note._id)}>
                  Save
                </button>

                <button onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="note-content">
                <h3>{note.title}</h3>

                <p>{note.content}</p>

                <small>
                  {new Date(note.createdAt).toLocaleString()}
                </small>
              </div>

              <div className="note-actions">
                <button type="button" onClick={() => startEditing(note)}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onTogglePin(note._id)}
                >
                  {note.isPinned ? "Unpin" : "Pin"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this note?")) {
                      onDelete(note._id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </article>
      ))}
    </div>
  );
}

export default NoteList;