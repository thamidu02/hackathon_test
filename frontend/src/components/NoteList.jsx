function NoteList({ notes }) {
  return (
    <div>
      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteList;