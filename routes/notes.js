const notes = require('express').Router();
const { readFile, writeFile } = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

notes.get('/', async (req, res) => {
    try {
        const data = await readFile('./db/db.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error(err)
    }
});

notes.post('/', async (req, res) => {
    const { title, text } = req.body;
    if (title) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        try {
            const data = await readFile('./db/db.json', 'utf8');
            const notes = JSON.parse(data);
            notes.push(newNote);
            writeFile('./db/db.json', JSON.stringify(notes));
            res.json(newNote)
        } catch (err) {
            console.error(err)
        }
    }
})

notes.delete('/:id', async (req, res) => {
    const noteId = req.params.id;
    try {
        const data = await readFile('./db/db.json', 'utf8');
        const notes = JSON.parse(data);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === noteId) {
                notes.splice(i, 1);
                writeFile('./db/db.json', JSON.stringify(notes));
                return res.status(200).json(`Id ${noteId} is deleted.`);
            }
        }
        res.status(404).json(`Id ${noteId} is not found.`);
    } catch (err) {
        console.error(err);
    }
})

module.exports = notes;