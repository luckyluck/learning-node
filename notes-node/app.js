const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv;
const command = argv._[0];

switch (command) {
    case 'add':
        {
            const note = notes.addNote(argv.title, argv.body);
            if (note) {
                console.log('Note created');
                notes.logNote(note);
            } else {
                console.log('Note title taken');
            }
            break;
        }
    case 'remove':
        {
            const noteRemoved = notes.removeNote(argv.title);
            console.log(noteRemoved ? 'Note was removed' : 'Note not found');
            break;
        }
    case 'list':
        {
            const noteList = notes.getAll();
            console.log('Notes: ', noteList.length);
            noteList.forEach(note => {
                notes.logNote(note);
            });
            break;
        }
    case 'read':
        {
            const note = notes.getNote(argv.title);
            if (note) {
                console.log('Note found');
                notes.logNote(note);
            } else {
                console.log('Note not found');
            }
            break;
        }
    default:
        console.log('Command not recognized');
}