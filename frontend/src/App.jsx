import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div>
            <h1>KOTHTHU GUYS</h1>
            <p>Simple Notes Management Application</p>
          </div>
        </header>

        <main>
          <section className="card">
            <h2>Welcome</h2>
            <p>Manage your notes easily in one place.</p>

            <button onClick={() => navigate("/notes")}>
              View Notes
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

function Notes() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;