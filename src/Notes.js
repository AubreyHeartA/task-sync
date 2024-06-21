// src/Notes.js
import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollection = await firestore.collection('notes').get();
      setNotes(notesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchNotes();
  }, []);

  const addNote = async () => {
    await firestore.collection('notes').add({ text: newNote });
    setNewNote('');
    // Optionally fetch notes again to update the list
  };

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="text"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="New note"
      />
      <button onClick={addNote}>Add Note</button>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
    