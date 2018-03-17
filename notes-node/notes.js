const fs = require('fs');

const fetchNotes = () => {
    let notes = [];

    try {
        const notesStr = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesStr);
    } catch (e) {
        console.log("File doesn't exist");
    }

    return notes;
};

const saveNotes = notes => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
    const notes = fetchNotes();
    const note = { title, body };
    const isExist = notes.some(n => n.title === note.title);

    if (!isExist) {
        notes.push(note);
        saveNotes(notes);

        return note;
    }

    return null;
};

const getAll = () => fetchNotes();

const getNote = (title) => {
    const notes = fetchNotes();

    for (const note of notes) {
        if (note.title === title) {
            return note;
        }
    }

    return null;
};

const removeNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter(note => note.title !== title);

    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

const logNote = note => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};