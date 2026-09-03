import { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();

        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="app">
      <div className="container">

        <header className="header">
          <div>
            <h1>My Notes</h1>
            <p>Capture your thoughts. Keep them organized.</p>
          </div>

          <div className="note-count">
            {notes.length} {notes.length === 1 ? "Note" : "Notes"}
          </div>
        </header>

        <main>
          <section className="card">
            <h2>Add a Note</h2>

            <NoteForm setNotes={setNotes} />
          </section>

          <section className="notes-section">
            <div className="section-header">
              <h2>All Notes</h2>

              <span>{notes.length}</span>
            </div>

            <NoteList notes={notes} setNotes={setNotes} />
          </section>
        </main>

      </div>
    </div>
  );
}

export default App;