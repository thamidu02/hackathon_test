import { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <div>
      <h1>My Notes</h1>

      <NoteForm setNotes={setNotes} />

      <NoteList notes={notes} />
    </div>
  );
}

export default App;