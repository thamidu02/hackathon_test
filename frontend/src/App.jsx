import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import TaskDashboard from "./components/TaskDashboard";
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
              
          <section className="card dashboard-card">
              <div className="card-icon">✅</div>
              <h2>Tasks</h2>
              <p>Keep track of your tasks and deadlines.</p>
              <button className="btn-primary" onClick={() => navigate("/tasks")}>
                View Tasks
              </button>
            </section>

        </main>
      </div>
    </div>
  );
}

function Notes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();

        setNotes(data);
        setError("");
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setError("Unable to load notes. Please check that the backend is running.");
      }
    };

    fetchNotes();
  }, []);

  const togglePin = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${id}/pin`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle note pin");
      }

      const updatedNote = await response.json();
      setNotes((previousNotes) =>
        previousNotes.map((note) => (note._id === id ? updatedNote : note))
      );
      setError("");
    } catch (error) {
      console.error("Failed to toggle note pin:", error);
      setError("Unable to update the note. Please try again.");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      await response.json();
      setNotes((previousNotes) =>
        previousNotes.filter((note) => note._id !== id)
      );
      setError("");
    } catch (error) {
      console.error("Failed to delete note:", error);
      setError("Unable to delete the note. Please try again.");
    }
  };

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

            {error && <p className="error-message">{error}</p>}
            <NoteList
              notes={notes}
              setNotes={setNotes}
              onTogglePin={togglePin}
              onDelete={deleteNote}
            />
          </section>
        </main>

      </div>
    </div>
  );
}
// TASKS COMPONENT - UPDATED
function Tasks() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div>
            <button className="back-btn" onClick={() => navigate("/")}>
              ← Back
            </button>
            <h1>My Tasks</h1>
            <p>Keep track of your tasks and deadlines.</p>
          </div>
        </header>

        <main>
          <TaskDashboard /> {/* Make sure this is rendering */}
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
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;