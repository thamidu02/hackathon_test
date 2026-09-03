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
          <h1>My Notes</h1>
          <p>Capture your thoughts. Keep them organized.</p>
        </header>

        <section className="card">
          <h2>Add a Note</h2>
          <NoteForm setNotes={setNotes} />
        </section>

        <section className="card">
          <h2>All Notes</h2>
          <NoteList notes={notes} />
        </section>

      </div>
    </div>
  );
}

export default App;

