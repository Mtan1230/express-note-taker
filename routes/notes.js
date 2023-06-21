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

module.exports = notes;